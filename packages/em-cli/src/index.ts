import { CommandInit } from '@em-cli/em-plugin-init';
import { CommandAddCmd, CommandCreate, CommandBuild, CommandDev, CommandEnv2Json } from './command';
import ECli from './core';
const eCli = new ECli();
eCli
  .addCommand(CommandAddCmd)
  .addCommand(CommandCreate)
  .addCommand(CommandDev)
  .addCommand(CommandBuild)
  .addCommand(CommandEnv2Json)
  .addCommand(CommandInit as any)
;
eCli.run();

export * from './core/command';
export * from './core/base';
export * from './types';