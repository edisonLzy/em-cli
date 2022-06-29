import type { QuestionCollection, CheckboxChoiceOptions } from 'inquirer';
import type { Creator } from './creator';
export type OnPromptComplete<T = any> = (
  answers: T,
  context: Record<string, any>
) => void;
let instance: PromptModuleAPI | undefined;

export class PromptModuleAPI {
  constructor(private creator: Creator) {
    this.creator = creator;
  }
  static _instance: PromptModuleAPI;
  static getInstance(creator?: Creator) {
    if (instance) {
      return instance;
    }
    return (instance = new PromptModuleAPI(creator!));
  }
  //插入特性
  injectFeature(feature: CheckboxChoiceOptions) {
    (this.creator.featurePrompt.choices as any).push(feature);
  }
  //插入选项
  injectPrompt(prompt: QuestionCollection) {
    this.creator.injectedPrompts = this.creator.injectedPrompts.concat(prompt);
  }
  //选择完成后的回调
  onPromptComplete(cb: OnPromptComplete) {
    this.creator.promptCompleteCbs.push(cb);
  }
}
export interface InjectPrompt {
  (cli: PromptModuleAPI): void;
}
