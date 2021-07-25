import shell from 'shelljs';
import { logger } from '@em-cli/shared';
export default {
  tips: '初始化 ts',
  async fn(cwd: string) {
    shell.cd(cwd);
    if (shell.which('npm')) {
      shell.exec('npm i typescript -D');
      shell.exec('npx tsc --init');
      logger.clearConsole(logger.done('🚀 ts 初始化完成'));
    }
  },
};
