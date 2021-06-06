import commander from 'commander';
import BaseClass from './base';
export type Options = [directive: string, description?: string, defaultValue?: string | boolean | undefined];
export type Command = commander.Command
export abstract class BaseCommand extends BaseClass {
  static installed: boolean = false
  abstract id: string
  option: Options[] = []
  args = ''
  description = ''
  examples: string[] = []
  abstract run(args?: string[],optionsArgs?:Record<string, any>, Command?: Command): any
}
