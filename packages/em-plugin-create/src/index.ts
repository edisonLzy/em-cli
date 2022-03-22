import { defineCommand } from '@em-cli/core';
import { logger } from '@em-cli/shared';
import { createLink } from './core/link';
export default defineCommand({
  id: 'create',
  subCommands: [
    {
      id: 'plugin',
      args: '<name>',
      description: '创建命令插件',
      run({ args, optionsArgs }) {
        console.log('plugin', args);
      },
    },
    {
      id: 'link',
      description: '创建 link',
      option: [['-w,--workinDir [workinDir]', '当前工作目录', process.cwd()]],
      run({ args, optionsArgs }) {
        const { workinDir } = optionsArgs;
        createLink(workinDir);
      },
    },
  ],
  description: 'create something',
  async run({ optionsArgs, args }) {
    logger.info('use plugin or link to create', '');
  },
});
