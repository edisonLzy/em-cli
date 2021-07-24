import commander, { createCommand } from 'commander';
import { logger } from '@em-cli/shared';
import {createInquire} from './inquirer';
import BaseClass from './base';
import { CommandConfig } from './command';
import path from 'path';
import readPkg from 'read-pkg';
const { version, name } = readPkg.sync({
  cwd: path.resolve(__dirname, '../../')
});
class ECli extends BaseClass {
  private program: commander.Command
  private CommandCtors: CommandConfig[] = []
  private CommandIds = new Set<string>()
  constructor () {
    super();
    this.program = this.createProgram(); // 创建program
  }
  private createProgram (): commander.Command {
    const program = createCommand();
    program.version(logger.info(`${version}`, name, false));
    program.usage('<command> [options]');
    program.passThroughOptions();
    program.allowExcessArguments(false);
    return program;
  }
  private runCommand () {
    for (const command of this.CommandCtors) {
      const nameAndArgs = `${command.id} ${
        command.args ? `${command.args}` : ''
      }`;
      const cmd = this.program.command(nameAndArgs);
      if (command.description) {
        cmd.description(command.description);
      }
      // 添加options
      if (command.option && command.option.length !== 0) {
        for (const option of command.option) {
          cmd.option(...option);
        }
      }
      // 添加helpText
      if (command.examples && command.examples.length !== 0) {
        command.examples = command.examples.map(it => `  ${it}`);
        cmd.addHelpText(
          'after',
          `
    Examples:

    ${logger.info(command.examples.join('\n'))}
              `
        );
      }
      cmd.action(async (...args: any[]) => {
        const inquirerAnswers = await this.addInquirer(command);  
        // 获取 command 实例
        const commandInstance: commander.Command = args.pop();
        // 获取 options 参数
        const optionsArgs: Record<string, any> = args.pop();
        // command 命令参数
        const commandArg: string[] = [...args];
        command.run({
          args:commandArg,
          optionsArgs, 
          command:commandInstance,
          answers:inquirerAnswers
        });
      });
    }
    // 必须在parse之前完成命令的注册
    this.program.parse(process.argv);
  }
  addCommand (command: CommandConfig) {
    const id =  command.id;
    if(this.CommandIds.has(id)){
      return this; 
    }
    this.CommandIds.add(id);
    this.CommandCtors.push(command);
    return this;
  }
  private  async addInquirer(command: CommandConfig){
    let answers = {};    
    if(command.prompting){      
      answers = await createInquire(command.prompting);
    }
    return answers;
  }
  async run () {
    // 注册命令
    this.runCommand();
  }
}
export default ECli;
