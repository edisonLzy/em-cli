import commander from 'commander';
export type Options = [directive: string, description?: string, defaultValue?: string | boolean | undefined];
export type Command = commander.Command

export type CommandRun  = (args: string[],optionsArgs:Record<string, any>, Command: Command) => void
export interface CommandConfig {
  /**
   * 命令的标示 比如: init
   */
  id: string
  /**
   * options 参数
   */
   option?: Options[]
   /**
    * 参数 比如: <params>
    */
   args?: string
   /**
    * description
    */
   description?: string
   examples?: string[]
   run: CommandRun
}
export function defineCommand(config:CommandConfig){
  return config;
}