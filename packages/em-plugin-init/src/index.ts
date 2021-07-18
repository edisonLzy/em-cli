import { BaseCommand, Options } from '@em-cli/em-cli';
import { PipeLine } from 'em-pipeline';
import { eslintInstall } from './dep/eslint';
import { commitLintInstall } from './dep/commitlint';

export class CommandInit extends BaseCommand {
  static installed: boolean = false
  id = 'init'
  option = [
    ['-p, --project <project>', 'chose current working path', process.cwd()]
  ] as Options[]
  description = '初始化项目'
  run(args?: string[], optionsArgs?: Record<string, any>) {
    console.log('run');
  }
}
