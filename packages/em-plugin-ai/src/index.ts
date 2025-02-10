import { defineCommand } from '@em-cli/core';

export default defineCommand({
  id: 'ai',
  option: [['-m,--model [model]', '模型']],
  description: 'ai',
  async run({ args, optionsArgs }) {
    console.log('hello', optionsArgs);
  },
});
