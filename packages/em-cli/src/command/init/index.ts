import { BaseCommand } from '../../core/command';
import type { Options } from '../../core/command';

export class CommandInit extends BaseCommand {
  static installed: boolean = false
  id = 'init'
  args = '<params>'
  option = [['-p, --preset <presetName>', 'Skip prompts and use saved or remote preset', 'babel']] as Options[]
  description = '初始化项目'
  run(args?: string[], optionsArgs?: Record<string, any>) {
    console.log('run,', args, optionsArgs);
  }
}


