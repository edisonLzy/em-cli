import { elog } from '@em-cli/shared';
import { defineCommand } from '@em-cli/em-cli';
import fg from 'fast-glob';
import { addTemplate } from './add';
import { createProjectByTemplate } from './create';
import { getRepoCacheDir } from './utils';
export default defineCommand({
  id: 'template',
  description: '模板管理',
  subCommands: [
    {
      id: 'add',
      args: '<remoteUrl>',
      description: 'add template to remote',
      async run({ args }) {
        // 获取 模版目录
        const [remoteUrl] = args;
        await addTemplate(remoteUrl);
      },
    },
    {
      id: 'create',
      args: '<project>',
      option: [['-w,--workinDir <workinDir>', '工作目录', process.cwd()]],
      description: 'use selected template create project',
      async run({ args, optionsArgs }) {
        const { workinDir } = optionsArgs;
        const [project] = args;
        await createProjectByTemplate(project, workinDir);
      },
    },
  ],
  async run() {
    const repoCacheDir = getRepoCacheDir();
    const pkgs = await fg(`${repoCacheDir}/*`, {
      onlyDirectories: true,
    });
    pkgs.forEach((pkg, idx) => {
      elog.info('%s. %s ', idx + 1 + '', pkg);
    });
  },
});
