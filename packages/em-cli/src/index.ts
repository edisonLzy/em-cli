import { defineCommand, CommandConfig } from './core/command'; // 会将 defineCommand 定义到 当前模块的exports对象上面
import CommandInit from '@em-cli/em-plugin-init'; // 插件中因为以来 @em-cli/cli 这个包 如果先导入插件就会导致 内部 defineCommand 为 undefined
import CommandDev from '@em-cli/em-plugin-dev';
import CommandBuild from '@em-cli/em-plugin-build';
import { CommandAddCmd } from './command';
import ECli from './core';
export function run(isDev: boolean) {
  const eCli = new ECli();
  eCli.addCommand(CommandInit).addCommand(CommandDev).addCommand(CommandBuild);
  if (isDev) {
    eCli.addCommand(CommandAddCmd);
  }
  eCli.run();
}
export { defineCommand, CommandConfig };
