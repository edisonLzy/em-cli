/**
 * create by em-cli
 */
import { defineCommand } from '@em-cli/core';

export default defineCommand({
  id: 'renderer',
  description: 'batch renderer template',
  async run({ args, optionsArgs }) {
    console.log('renderer worked');
  },
});
