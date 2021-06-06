import { BaseCommand } from '../../core/command';
import type { Options } from '../../core/command';

const options:Options[] = [
  ['-c, --cwd <projectPath>', '指定工作目录', 'babel'],
  ['-p, --port <port>', '启动服务的端口','8080']
]; 
export class CommandDev extends BaseCommand {
  static installed: boolean = false
  id = 'dev'
  option = options
  description = '通过vite启动项目'
  run(args?: string[], optionsArgs?: Record<string, any>) {
    console.log('run,', args, optionsArgs);
  }
}


