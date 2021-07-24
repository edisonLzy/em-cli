import { install,logger } from '@em-cli/shared';
import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import {gitignore,vscodeConfig,dockerFile , commitLint , jenkinsfile} from './template';
import { Dep } from '../base';

const deps = [
  'lint-staged',
  'husky'
];

class CommitLintInstall extends Dep {
  cwd!:string
  async install () {
    logger.info('正在安装依赖');
    for await (const dep of deps) {
      await install(dep, '-D');
    }
    logger.done('安装依赖完成');
  }
  async initialize () { 

    logger.info('正在初始化 husky');
    await execa('npx',['husky','install']);
    await fs.ensureDir(path.join(this.cwd,'.husky'));
    await execa('npx',['husky','add','.husky/pre-commit','"npm run lint"']);
    await execa('npx',['husky','add','.husky/pre-push','"npm run lint"']);
    logger.done('husky 初始化完成');

    logger.info('正在初始化 commitlint');
    await fs.outputFile(path.join(this.cwd,'commitlint.config.js'),commitLint);
    logger.done('commitlint 初始化完成');

    logger.info('正在初始化 gitignore');
    await fs.outputFile(path.join(this.cwd,'.gitignore'),gitignore);
    logger.done('gitignore 初始化完成');

    logger.info('初始化 vscode config');
    await fs.outputFile(path.join(this.cwd,'/.vscode/settings.json'),vscodeConfig);
    logger.done('vscode config 初始化完成');

    logger.info('初始化 Dockerfile');
    await fs.outputFile(path.join(this.cwd,'Dockerfile'),dockerFile);
    logger.done('Dockerfile 初始化完成');
    
    logger.info('初始化  Jenkinsfile');
    await fs.outputFile(path.join(this.cwd,'Jenkinsfile'),jenkinsfile);
    logger.done('Jenkinsfile 初始化完成');

  }
  async run (cwd: string) {
    logger.info('开始初始化 commitlint');
    this.cwd = cwd;
    await this.install();
    await this.initialize();
  }
}

const commitLintInstall = new CommitLintInstall();

export { commitLintInstall };
