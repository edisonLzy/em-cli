import BaseClass from './base';
import { BaseCommand } from './command';
interface PluginCtor {
    installed: boolean;
    new (CliInstance: EmCli): BaseCommand;
}
declare class EmCli extends BaseClass {
    private program;
    private CommandCtors;
    constructor();
    private createProgram;
    private runCommand;
    addCommand(command: PluginCtor): this;
    run(): Promise<void>;
}
export default EmCli;
