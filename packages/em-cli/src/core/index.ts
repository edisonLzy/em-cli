import commander, { createCommand } from 'commander';
import { logger } from '@em-cli/shared';
import BaseClass from './base';
import { CommandConfig } from './command';
import path from 'path';
import readPkg from 'read-pkg';

const pkg = readPkg.sync({
  cwd: path.resolve(__dirname, '../../'),
});

class ECli extends BaseClass {
  private program: commander.Command;
  private CommandCtors: CommandConfig[] = [];
  private CommandIds = new Set<string>();
  private beenParsed = false;
  constructor() {
    super();
    this.program = this.createProgram(); // 创建program
  }
  private createProgram(): commander.Command {
    const program = createCommand();
    program.version(logger.info(`${pkg.version}`, pkg.name, false));
    program.usage('<command> [subCommand] [options]');
    program.passThroughOptions();
    program.allowExcessArguments(false);
    return program;
  }
  private registerCommand(command: CommandConfig, program: commander.Command) {
    const cmd = program.command(command.id);
    if (command.args) {
      cmd.arguments(command.args);
    }
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
      command.examples = command.examples.map((it) => `  ${it}`);
      cmd.addHelpText(
        'after',
        `
  Examples:

  ${logger.info(command.examples.join('\n'))}
            `
      );
    }
    // 添加子命令
    if (command.subCommands && command.subCommands.length !== 0) {
      this.registerCommands(command.subCommands, cmd);
    }
    cmd.action(async (...args: any[]) => {
      // 弹出 command install
      args.pop();
      // 获取 options 参数
      const optionsArgs: Record<string, any> = args.pop();
      // command 命令参数
      const commandArg: string[] = args;
      command.run({
        args: commandArg || [],
        optionsArgs,
      });
    });
  }
  private registerCommands(
    commands: CommandConfig[],
    program: commander.Command
  ) {
    for (const command of commands) {
      this.registerCommand(command, program);
    }
    this.parseArgs();
  }
  private parseArgs() {
    if (this.beenParsed) {
      return;
    }
    this.beenParsed = true;
    //! 必须在parse之前完成命令的注册,且只能注册 parse一次,parse多次 可能会导致 action执行多次
    this.program.parse(process.argv);
  }
  addCommand(command: CommandConfig) {
    const id = command.id;
    if (this.CommandIds.has(id)) {
      return this;
    }
    this.CommandIds.add(id);
    this.CommandCtors.push(command);
    return this;
  }
  async run() {
    // 注册命令
    this.registerCommands(this.CommandCtors, this.program);
  }
}
export default ECli;
