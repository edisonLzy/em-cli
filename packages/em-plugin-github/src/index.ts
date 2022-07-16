/**
 * create by core
 */
import { defineCommand } from '@em-cli/core';
import { logger } from '@em-cli/shared';
import { getRepo, getInfo } from './core';
export default defineCommand({
  id: 'github',
  description: 'base github REST API',
  subCommands: [
    {
      id: 'whoami',
      description: 'get current user information',
      async run() {
        getInfo().catch(logger.error);
      },
    },
    {
      id: 'repo',
      description: 'get repo',
      option: [['-d,--dirname [dirname]', '本地存放地址']],
      async run({ args, optionsArgs }) {
        getRepo(optionsArgs.dirname).catch(logger.error);
      },
    },
  ],
  async run({ args, optionsArgs }) {
    console.log('xx');
  },
});
