/**
 * create by core
 */
import { defineCommand } from '@em-cli/core';

export default defineCommand({
  id: 'github',
  description: 'base github REST API',
  async run({ args, optionsArgs }) {
    console.log('github worked');
  },
});
