import commander from 'commander';
import type { QuestionCollection } from 'inquirer';
export type Options = [
  directive: string,
  description?: string,
  defaultValue?: string | boolean | undefined
];
export type Command = commander.Command;
export interface CommandConfig {
  /**
   * 命令的标示 比如: init
   */
  id: string;
  /**
   * options 参数
   */
  option?: Options[];
  /**
   * prompting 用户交互信息收集
   *
   */
  prompting?: QuestionCollection[];
  /**
   * 参数 比如: <params>
   */
  args?: string;
  /**
   * description
   */
  description?: string;
  /**
   * examples
   */
  examples?: string[];
  /**
   * subcommand: 注册子命令
   */
  subCommands?: this[];
  run: (args: { args: string[]; optionsArgs: Record<string, any> }) => void;
}
export function defineCommand(config: CommandConfig) {
  return config;
}
