import { prompt } from 'inquirer';
import fs from 'fs-extra';
import type { CheckboxQuestionOptions, QuestionCollection } from 'inquirer';
import { ApplyOptions } from './features/index';
import { FeatureOptions } from './features';
import loadApplies from './features/loadApply';
import type { OnPromptComplete } from './promptModules';
import { PromptModuleAPI } from './promptModules';
import { Product } from './product';
const defaultFeaturePrompt = {
  name: 'features',
  type: 'checkbox',
  message: '🚀 请选择项目特性:',
  choices: [],
};

export class Creator {
  // 特性列表
  featurePrompt: CheckboxQuestionOptions = defaultFeaturePrompt;
  // 注入的问题
  injectedPrompts: QuestionCollection[] = [];
  // 选择结束之后的回调
  promptCompleteCbs: OnPromptComplete[] = [];
  // 注入的项目选项
  projectOptions: Record<string, unknown> = {};
  // 产物
  products: Product[] = [];
  constructor(
    public projectName: string,
    public projectDir: string,
    private features: FeatureOptions[]
  ) {
    const promptModuleAPI = PromptModuleAPI.getInstance(this);
    features.forEach((f) => f.injectPrompt(promptModuleAPI));
  }
  async create() {
    const projectOptions = (this.projectOptions =
      await this.promptAndResolve());
    const applies = await this.getBeenAppliedFeature(projectOptions.plugins);
    // 执行apply方法收集 product
    this.executeApplies(applies);
    // 消费收集到的 product
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
    for await (const product of this.products) {
      const { fileManage, deps, name, shells } = product;
      await this.processFiles(fileManage);
    }
  }
  collectProduct(product: Product) {
    this.products.push(product);
  }
  private async processFiles(fileManage: Product['fileManage']) {
    await fileManage.outFile();
  }
  private async processDeps(deps: Product['deps']) {}
  private async processShells(shells: Product['shells']) {}
}
