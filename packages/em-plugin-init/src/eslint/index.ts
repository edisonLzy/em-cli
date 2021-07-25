import shell from 'shelljs';
import { logger } from '@em-cli/shared';
import { eslintIgnore, eslint, prettierignore, prettier } from './template';

const deps = [
  '@babel/eslint-parser',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'prettier',
  'eslint',
];
export default {
  tips: '初始化eslint和prettier',
  async fn(cwd: string) {
    shell.cd(cwd);
    shell.exec(`echo "${eslintIgnore}" > .eslintignore`);
    shell.exec(`echo "${eslint}" > .eslintrc.js`);
    shell.exec(`echo "${prettierignore}" > .prettierignore`);
    shell.exec(`echo "${prettier}" > .prettierrc`);
    if (shell.which('npm')) {
      shell.exec(`npm i ${deps.join(' ')} -D`);
    }
    logger.clearConsole(logger.done('🚀 eslint和prettier初始化完毕'));
  },
};
