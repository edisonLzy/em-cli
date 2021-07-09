import fs from 'fs-extra';
import path from 'path';
import { Dep } from '../base';
import { install,logger } from '@em-cli/shared';
import { eslintIgnore,eslint } from './template';

const deps = [
  '@babel/eslint-parser',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint-config-prettier',
  'eslint-config-standard',
  'eslint-config-standard-jsx',
  'eslint-config-standard-react',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-prettier',
  'eslint-plugin-promise',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-unicorn',
  'prettier',
];
class EslintInstall extends Dep {
  cwd!:string
  files = [['.eslintignore',eslintIgnore],['.eslintrc.js',eslint]]
  async install () {
    logger.info('正在安装依赖');
    for await (const dep of deps) {
      await install(dep, '-D');
    }
    logger.done('安装依赖完成');
  }
  async initialize () { 
    logger.info('正在输出文件');
    for (const file of this.files) {
      const [filename,data] = file;
      const filePath = path.join(this.cwd,filename);
      await fs.outputFile(filePath,data);
      logger.done(`输出 ${filename} 文件`);
    }
  }
  async run (cwd: string) {
    logger.info('开始初始化 eslint');
    this.cwd = cwd;
    await this.install();
    await this.initialize();
  }
}

const eslintInstall = new EslintInstall();

export { eslintInstall };
