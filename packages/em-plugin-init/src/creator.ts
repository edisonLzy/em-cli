import type { CheckboxQuestionOptions, QuestionCollection } from 'inquirer';
import { prompt } from 'inquirer';
import type { OnPromptComplete } from './plugin';
import { PromptModuleAPI } from './plugin';
const defaultFeaturePrompt = {
  name: 'features',
  type: 'checkbox',
  message: '请选择项目特性:',
  choices: [],
};

export class Creator {
  // 特性列表
  featurePrompt: CheckboxQuestionOptions = defaultFeaturePrompt;
  // 注入的问题
  injectedPrompts: QuestionCollection[] = [];
  // 选择结束之后的回调
  promptCompleteCbs: OnPromptComplete[] = [];
  constructor(features: any[]) {
    const promptModuleAPI = PromptModuleAPI.getInstance(this);
    features.forEach((f) => f(promptModuleAPI));
  }
  async create(project: string) {
    const projectOptions = await this.promptAndResolve(project);
  }
  private async promptAndResolve(project: string) {
    const prompts = [this.featurePrompt, ...this.injectedPrompts];
    const answers = await prompt(prompts);
    const projectOptions = { workinDir: project };
    this.promptCompleteCbs.forEach((cb) => cb(answers, projectOptions));
    return projectOptions;
  }
}
