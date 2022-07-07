/**
 * create by core
 */
import { defineCommand } from '@em-cli/core';

import runTest from './core';
export default defineCommand({
  id: 'debug',
  description: 'debug source code',
  async run({ args, optionsArgs }) {
    runTest();
  },
});
