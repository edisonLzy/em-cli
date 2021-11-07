import fg from 'fast-glob';
import { logger } from '@em-cli/shared';
import { defineCommand } from '@em-cli/em-cli';
import { addTemplate } from './command/add';
import { updateTemplate } from './command/update';
import { createProjectByTemplate } from './command/create';
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
      id: 'update',
      description: 'update template in local ',
      async run() {
        updateTemplate().catch(logger.error);
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
        createProjectByTemplate(project, workinDir).catch(logger.error);
      },
    },
  ],
  async run() {
    const repoCacheDir = getRepoCacheDir();
    const pkgs = await fg(`${repoCacheDir}/*`, {
      onlyDirectories: true,
    });
    logger.array(pkgs);
  },
});
