/**
 * create by core
 */
import { defineCommand } from '@em-cli/core';
import { logger } from '@em-cli/shared';
import { whoami } from './core';
import { batchDeleteDocs } from './core/docs';
import { batchDeleteRepos, syncToRepos } from './core/repos';
export default defineCommand({
  id: 'yuque',
  description: 'base yuque sdk',
  subCommands: [
    {
      id: 'whoami',
      description: 'get user',
      async run() {
        whoami().catch(logger.error);
      },
    },
    {
      id: 'sync',
      description: 'sync local dir to yuque repos',
      option: [['-d,--dirname [dirname]', '工作目录', process.cwd()]],
      async run({ args, optionsArgs }) {
        const { dirname } = optionsArgs;
        syncToRepos(dirname).catch(logger.error);
      },
    },
    {
      id: 'delete',
      description: 'delete repos',
      async run({ args, optionsArgs }) {
        batchDeleteRepos().catch(logger.error);
      },
    },
  ],
  async run({ args, optionsArgs }) {
    console.log('yuque command');
  },
});
