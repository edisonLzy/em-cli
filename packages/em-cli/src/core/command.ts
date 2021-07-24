import commander from 'commander';
import type {QuestionCollection} from 'inquirer';
export type Options = [directive: string, description?: string, defaultValue?: string | boolean | undefined];
export type Command = commander.Command
export interface CommandConfig<Args = any,OptionsArgs = any,Answers = any> {
  /**
   * 命令的标示 比如: init
   */
  id: string
  /**
   * options 参数
   */
   option?: Options[]
   /**
    * prompting 用户交互信息收集
    *
    */
   prompting?:QuestionCollection[]
   /**
    * 参数 比如: <params>
    */
   args?: string
   /**
    * description
    */
   description?: string
   examples?: string[]
   run: (args:{
     args: string[],
     optionsArgs:Record<string, any>, 
     answers:Answers
     command: Command
   })=>void
}
export function defineCommand<Args = any,Options= any,Answers= any>(config:CommandConfig<Args,Options,Answers>){
  return config;
}