import { defineCommand } from '@em-cli/em-cli';

export default defineCommand({
  id: 'create',
  description: '创建命令插件',
  option: [
    ['-n,--name [name]', '插件名称'],
    ['-d,--workinDir [workinDir]', '当前工作路径', process.cwd()],
  ],
  async run({ optionsArgs }) {},
});
