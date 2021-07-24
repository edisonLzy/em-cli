import { defineCommand } from '@em-cli/em-cli';
import { inquirer } from '@em-cli/shared';
import { PipeLine } from 'em-pipeline';
import initCi from './ci';
import initGit from './git';
import initEditor from './editor';
import initCommitLint from './commitlint';
const presets = {
  git: initGit,
  ci: initCi,
  editor: initEditor,
  commitlint: initCommitLint
  // 'eslint',
  // 'typescript',
  // 'jest',
  // 'travis',
};
export default defineCommand({
  id: 'init',
  option: [
    ['-t,--template [template]', '模版项目地址'],
    ['-p,--project [project]', '当前工作目录', process.cwd()]
  ],
  description: '初始化项目',
  async run ({ optionsArgs }) {
    const { template, project } = optionsArgs;
    if (template) {
      // 拉取模版
    }
    // 获取用户需要安装的预设
    const answers = await inquirer([
      {
        type: 'checkbox',
        name: 'presets',
        default: ['ci', 'git'],
        choices: Object.keys(presets)
      }
    ]);
    const tasks = new PipeLine();
    // 根据preset注册任务
    for (const preset of answers.presets) {
      const { tips, fn } = presets[preset as keyof typeof presets];
      tasks.tap(tips, async (app, { next }) => {
        await fn(project);
        next();
      });
    }
    tasks.run({});
  }
});
