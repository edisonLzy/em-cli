import { createCommand } from 'commander';
import path from 'path';
import readPkg from 'read-pkg';
import createApp from './createApp';

// 命令行启动
export function run() {
  const pkg = readPkg.sync({
    cwd: path.resolve(__dirname, '../'),
  });

  const program = createCommand();
  program.on('exit', () => {
    console.log();
  });

  program
    .version(pkg.version, '-v, --version')
    .arguments('<project-name>')
    .usage('<project-name> [options]')
    .action(createApp);

  program.parse(process.argv);
}
// 模块导入使用
export { createApp };
