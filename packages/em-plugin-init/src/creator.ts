import { prompt } from 'inquirer';
import type { CheckboxQuestionOptions, QuestionCollection } from 'inquirer';
import { installPkg } from '@em-cli/shared';
import { ApplyOptions } from './features/index';
import { FeatureOptions } from './features';
import loadApplies from './features/loadApply';
import type { OnPromptComplete } from './promptModule';
import { PromptModuleAPI } from './promptModule';
import { Product } from './product';
const defaultFeaturePrompt = {
  name: 'features',
  type: 'checkbox',
  message: 'ð è¯·éæ©é¡¹ç®ç¹æ§:',
  choices: [],
};

export class Creator {
  // ç¹æ§åè¡¨
  featurePrompt: CheckboxQuestionOptions = defaultFeaturePrompt;
  // æ³¨å¥çé®é¢
  injectedPrompts: QuestionCollection[] = [];
  // éæ©ç»æä¹åçåè°
  promptCompleteCbs: OnPromptComplete[] = [];
  // æ³¨å¥çé¡¹ç®éé¡¹
  projectOptions: Record<string, unknown> = {};
  // äº§ç©
  product: Product;
  constructor(
    public projectName: string,
    public projectDir: string,
    private features: FeatureOptions[]
  ) {
    this.product = new Product(projectDir);
    const promptModuleAPI = PromptModuleAPI.getInstance(this);
    features.forEach((f) => f.injectPrompt(promptModuleAPI));
  }
  async create() {
    const projectOptions = (this.projectOptions =
      await this.promptAndResolve());
    const applies = await this.getBeenAppliedFeature(projectOptions.plugins);
    // æ§è¡applyæ¹æ³æ¶é product
    this.executeApplies(applies);
    // æ¶è´¹æ¶éå°ç product
    await this.consumeProducts();
  }
  private async getBeenAppliedFeature(applyFeatures: Record<string, unknown>) {
    const features = Object.keys(applyFeatures);
    const applies = await loadApplies(features, applyFeatures);
    return applies;
  }
  private executeApplies(
    usedPlugins: {
      apply: FeatureOptions['apply'];
      options: ApplyOptions;
    }[]
  ) {
    usedPlugins.forEach(({ apply, options }) =>
      Reflect.apply(apply, null, [options, this])
    );
  }
  private async promptAndResolve() {
    const prompts = [this.featurePrompt, ...this.injectedPrompts];
    const answers = await prompt(prompts);
    const projectOptions = { workinDir: this.projectDir, plugins: {} };
    this.promptCompleteCbs.forEach((cb) => cb(answers, projectOptions));
    return projectOptions;
  }
  private async consumeProducts() {
    const { fileManage, deps, shells } = this.product;
    await this.processFiles(fileManage);
    await this.processDeps(deps);
    await this.processShells(shells);
  }
  private async processFiles(fileManage: Product['fileManage']) {
    await fileManage.outFile(this.projectDir);
  }
  private async processDeps(deps: Product['deps']) {
    for (const [type, dep] of deps.entries()) {
      if (dep.length !== 0) {
        await installPkg(dep, {
          dev: type === 'devDep',
          silent: true,
        });
      }
    }
  }
  private async processShells(shells: Product['shells']) {
    await shells.runShells();
  }
}
