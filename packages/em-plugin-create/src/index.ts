import { defineCommand } from '@em-cli/em-cli';
import create, { CreateType } from './core';

export default defineCommand({
  id: 'create',
  description: '创建命令插件',
  args: '<type>',
  option: [
    ['-n,--name <name>', '插件名称'],
    ['-d,--workinDir [workinDir]', '当前工作路径', process.cwd()],
  ],
  async run({ optionsArgs, args }) {
    const [type] = args as [CreateType];
    await create(type)(optionsArgs);
  },
});
