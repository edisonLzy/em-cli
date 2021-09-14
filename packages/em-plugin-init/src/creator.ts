import type { CheckboxQuestionOptions, QuestionCollection } from 'inquirer';
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
  constructor() {
    const promptModuleAPI = new PromptModuleAPI(this);
  }
  async create() {}
}
