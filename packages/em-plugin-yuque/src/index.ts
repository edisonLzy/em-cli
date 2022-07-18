/**
 * create by core
 */
import { defineCommand } from '@em-cli/core';
import { logger } from '@em-cli/shared';
import { getUserInfo } from './core';
import { createRepo } from './core/repos';

export default defineCommand({
  id: 'yuque',
  description: 'base yuque sdk',
  subCommands: [
    {
      id: 'whoami',
      description: 'get current user information',
      async run() {
        getUserInfo().catch(logger.error);
      },
    },
  ],
  async run({ args, optionsArgs }) {
    createRepo({
      name: 'asd11',
      description: 'ass',
    });
  },
});
