import { defineCommand } from '@em-cli/em-cli';
import create, { CreateType } from './core';

export default defineCommand({
  id: 'create',
  description: 'create something',
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
      run({ args, optionsArgs }) {
        console.log('link');
      },
    },
  ],
  async run({ optionsArgs, args }) {
    console.log('xxx');
  },
});
