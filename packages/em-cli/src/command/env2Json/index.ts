import { BaseCommand } from '../../core/command';
import { Options } from '../../core/command';
import { env2Json } from './env2Json';
/**
 * env 转 json
 */
export class CommandEnv2Json extends BaseCommand {
  static installed: boolean = false
  id = 'env2Json'
  option = [
    [
      '-f, --file <fileName>',
      'Skip prompts and use saved or remote preset',
      '.env'
    ],
    ['-o, --output <fileName>']
  ] as Options[]
  description = 'env 转换为 json 文件'
  async run (args?: string[], optionsArgs?: Record<string, string>) {
    const { file, output } = optionsArgs!;
    await env2Json(file, output,process.cwd());
  }
}
