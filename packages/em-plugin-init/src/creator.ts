import { FeatureOptions } from './features';
import type { CheckboxQuestionOptions, QuestionCollection } from 'inquirer';
import { prompt } from 'inquirer';
import type { OnPromptComplete } from './promptModules';
import { PromptModuleAPI } from './promptModules';
import { InjectPlugin } from './plugin';
const defaultFeaturePrompt = {
  name: 'features',
  type: 'checkbox',
  message: '请选择项目特性:',
  choices: [],
};

export class Creator {
  // 特性列表
  featurePrompt: CheckboxQuestionOptions = defaultFeaturePrompt;
  // 注入的插件
  injectPlugins: Pick<FeatureOptions, 'injectPlugin' | 'name'>[] = [];
  // 注入的问题
  injectedPrompts: QuestionCollection[] = [];
  // 选择结束之后的回调
  promptCompleteCbs: OnPromptComplete[] = [];
  // 注入的项目选项
  projectOptions: Record<string, unknown> = {};
  // 插件输出的文件
  files = {};
  constructor(
    private projectName: string,
    private projectDir: string,
    private features: FeatureOptions[]
  ) {
    const promptModuleAPI = PromptModuleAPI.getInstance(this);
    features.forEach(({ name, injectPrompt, injectPlugin }) => {
      injectPrompt(promptModuleAPI);
      this.injectPlugins.push({
        name,
        injectPlugin,
      });
    });
  }
  async create() {
    const projectOptions = (this.projectOptions = await this.promptAndResolve(
      this.projectDir
    ));
    const plugins = this.filterUselessPlugin(projectOptions.plugins);
    this.applyPlugin(plugins);
  }
  private filterUselessPlugin(applyPlugins: Record<string, unknown>) {
    // 过滤掉没有被使用的插件
    const plugins = this.injectPlugins.reduce<FeatureOptions['injectPlugin'][]>(
      (acc, cur) => {
        if (applyPlugins[cur.name]) {
          acc.push(cur.injectPlugin);
        }
        return acc;
      },
      []
    );
    return plugins;
  }
  private applyPlugin(usedPlugins: FeatureOptions['injectPlugin'][]) {
    // const api = new
    // usedPlugins.forEach((plugin) => plugin());
  }
  private async promptAndResolve(project: string) {
    const prompts = [this.featurePrompt, ...this.injectedPrompts];
    const answers = await prompt(prompts);
    const projectOptions = { workinDir: project, plugins: {} };
    this.promptCompleteCbs.forEach((cb) => cb(answers, projectOptions));
    return projectOptions;
  }
}
