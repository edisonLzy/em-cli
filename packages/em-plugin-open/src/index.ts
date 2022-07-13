/**
 * create by core
 */
import { defineCommand } from '@em-cli/core';

export default defineCommand({
  id: 'open',
  description: 'base command open',
  async run({ args, optionsArgs }) {
    console.log('open worked');
  },
});
