import commander, { createCommand } from 'commander';
import BaseClass from './base';
import { BaseCommand } from './command';
import { COMMAND_TIPS } from '../const/tips';
interface PluginCtor {
  installed: boolean
  new(CliInstance: EmCli): BaseCommand
}
class EmCli extends BaseClass {
  private program: commander.Command
  private CommandCtors: PluginCtor[] = []
  constructor() {
    super();
    this.program = this.createProgram(); // 创建program
  }
  private createProgram(): commander.Command {
    const program = createCommand();
    program.version('0.0.1');
    program.configureOutput({
      writeErr:str=>{
        this.logError(str);
      }
    });
    program.passThroughOptions();
    program.allowExcessArguments(false);
    return program;
  }
  private runCommand() {
    for (const Ctor of this.CommandCtors) {
      const command = new Ctor(this);
      const nameAndArgs = `${command.id} ${command.args ? `${command.args}` : ''
      }`;
      const cmd = this.program.command(nameAndArgs);
      if (command.description) {
        cmd.description(command.description);
      }
      // 添加options
      if(command.option && command.option.length !== 0){
        for (const option of command.option) {
          cmd.option(...option);
        }
      }
      // 添加别名
      if(command.alias){
        cmd.alias(command.alias);
      }
      // 添加helpText
      if(command.examples && command.examples.length !== 0){
        command.examples = command.examples.map(it=>`  ${it}`);
        cmd.addHelpText('after',
          `
Examples:

${this.logChalk.blueBright(command.examples.join('\n'))}
          `);
      }
      cmd.action((...args: any[]) => {
        // 获取 command 实例
        const commandInstance:commander.Command = args.pop();
        // 获取 options 参数
        const optionsArgs:Record<string, any> = args.pop();
        // command 命令参数
        const commandArg:string[] = [...args]; 
        command.run(commandArg,optionsArgs, commandInstance);
      });
    }
    // 必须在parse之前完成命令的注册
    this.program.parse(process.argv);
  }
  addCommand(command: PluginCtor) {
    if (!command.installed) {
      this.CommandCtors.push(command);
      command.installed = true;
    }
    return this;
  }
  async run() {
    // 注册命令
    this.runCommand();
  }
}
export default EmCli;
