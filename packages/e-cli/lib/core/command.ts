import commander from 'commander';
import BaseClass from './base';
export type Options = [direactive: string, description?: string, defaultValue?: string | boolean | undefined];
export type Command = commander.Command
export abstract class BaseCommand extends BaseClass {
  static installed: boolean = false
  abstract id: string
  option: Options[] = []
  args = ''
  description = ''
  // 别名
  alias = ''
  examples: string[] = []
  abstract run(args?: string[],optonsArgs?:Record<string, any>, Command?: Command): any
  disable(): boolean | string | Promise<boolean | string> {
    return false;
  }
}
