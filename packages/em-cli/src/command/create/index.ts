import { BaseCommand } from '../../core/command';
import type { Options } from '../../core/command';

export class CommandCreate extends BaseCommand {
  static installed: boolean = false
  id = 'create'
  args = '<params>'
  option = [['-p, --preset <presetName>', 'Skip prompts and use saved or remote preset', 'babel']] as Options[]
  description = 'quick add cli command'
  run(args?: string[], optionsArgs?: Record<string, any>) {
    console.log('run,', args, optionsArgs);
  }
}


