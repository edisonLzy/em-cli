"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const base_1 = tslib_1.__importDefault(require("./base"));
class EmCli extends base_1.default {
    constructor() {
        super();
        this.CommandCtors = [];
        this.program = this.createProgram(); // 创建program
    }
    createProgram() {
        const program = commander_1.createCommand();
        program.version('0.0.1');
        program.configureOutput({
            writeErr: str => {
                this.logError(str);
            }
        });
        program.passThroughOptions();
        program.allowExcessArguments(false);
        return program;
    }
    runCommand() {
        for (const Ctor of this.CommandCtors) {
            const command = new Ctor(this);
            const nameAndArgs = `${command.id} ${command.args ? `${command.args}` : ''}`;
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
            // 添加别名
            if (command.alias) {
                cmd.alias(command.alias);
            }
            // 添加helpText
            if (command.examples && command.examples.length !== 0) {
                command.examples = command.examples.map(it => `  ${it}`);
                cmd.addHelpText('after', `
Examples:

${this.logChalk.blueBright(command.examples.join('\n'))}
          `);
            }
            cmd.action((...args) => {
                // 获取 command 实例
                const commandInstance = args.pop();
                // 获取 options 参数
                const optionsArgs = args.pop();
                // command 命令参数
                const commandArg = [...args];
                command.run(commandArg, optionsArgs, commandInstance);
            });
        }
        // 必须在parse之前完成命令的注册
        this.program.parse(process.argv);
    }
    addCommand(command) {
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
exports.default = EmCli;
