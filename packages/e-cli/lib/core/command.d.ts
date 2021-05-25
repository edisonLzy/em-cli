import commander from 'commander';
import BaseClass from './base';
export declare type Options = [direactive: string, description?: string, defaultValue?: string | boolean | undefined];
export declare type Command = commander.Command;
export declare abstract class BaseCommand extends BaseClass {
    static installed: boolean;
    abstract id: string;
    option: Options[];
    args: string;
    description: string;
    alias: string;
    examples: string[];
    abstract run(args?: string[], optonsArgs?: Record<string, any>, Command?: Command): any;
    disable(): boolean | string | Promise<boolean | string>;
}
