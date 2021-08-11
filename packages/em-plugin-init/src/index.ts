import { defineCommand } from '@em-cli/em-cli';
import { inquirer } from '@em-cli/shared';
import { PipeLine } from 'em-pipeline';
import initCi from './ci';
import initGit from './git';
import initEditor from './editor';
import initCommitLint from './commitlint';
import initEslint from './eslint';
import typescriptInit from './typescript';
import jestInit from './jest';
import travisInit from './travis';
import updateNotifier from 'update-notifier';

const presets = {
  git: initGit,
  ci: initCi,
  editor: initEditor,
  commitlint: initCommitLint,
  eslint: initEslint,
  typescript: typescriptInit,
  jest: jestInit,
  travis: travisInit,
};
export default defineCommand({
  id: 'init',
  option: [
    ['-t,--template [template]', '模版项目地址'],
    ['-p,--project [project]', '当前工作目录', process.cwd()],
  ],
  description: '初始化项目',
  async run({ optionsArgs }) {
    // notify for update
    updateNotifier({ pkg: require('../package.json') }).notify();
    const { template, project } = optionsArgs;
    if (template) {
      // 拉取模版
    }
    // 获取用户需要安装的预设
    const answers = await inquirer([
      {
        type: 'checkbox',
        name: 'presets',
        default: ['ci', 'git', 'eslint'],
        choices: Object.keys(presets),
      },
    ]);
    const tasks = new PipeLine();
    // 根据preset注册任务
    for await (const preset of answers.presets) {
      const { fn } = presets[preset as keyof typeof presets];
      await fn(project);
    }
    tasks.run({});
  },
});
