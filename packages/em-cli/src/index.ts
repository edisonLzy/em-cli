import { CommandAddCmd,CommandCreate,CommandBuild,CommandDev,CommandEnv2Json,CommandInit} from './command';
import ECli from './core';
const eCli = new ECli();
eCli
  .addCommand(CommandAddCmd)
  .addCommand(CommandCreate)
  .addCommand(CommandDev)
  .addCommand(CommandBuild)
  .addCommand(CommandEnv2Json)
  .addCommand(CommandInit)
;
eCli.run();
