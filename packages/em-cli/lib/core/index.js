"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const base_1 = __importDefault(require("./base"));
class ECli extends base_1.default {
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
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            // 注册命令
            this.runCommand();
        });
    }
}
exports.default = ECli;
