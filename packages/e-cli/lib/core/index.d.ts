import BaseClass from './base';
import { BaseCommand } from './command';
interface PluginCtor {
    installed: boolean;
    new (CliInstance: ECli): BaseCommand;
}
declare class ECli extends BaseClass {
    private program;
    private CommandCtors;
    constructor();
    private createProgram;
    private runCommand;
    addCommand(command: PluginCtor): this;
    run(): Promise<void>;
}
export default ECli;
