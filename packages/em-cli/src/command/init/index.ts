import { BaseCommand } from '../../core/command';
import { Options } from '../../core/command';
import { main } from '@em-cli/em-plugin-init';
export class CommandInit extends BaseCommand {
  static installed: boolean = false
  id = 'init'
  option = [
    ['-p, --project <project>', 'chose current working path', process.cwd()]
  ] as Options[]
  description = '初始化项目'
  run (args?: string[], optionsArgs?: Record<string, any>) {
    const { project } = optionsArgs!;
    main(project);
  }
}
