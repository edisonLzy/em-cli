import { CommandAddCmd,CommandCreate,CommandBuild,CommandDev,CommandEnv2Json} from './command';
import ECli from './core';
const eCli = new ECli();
eCli
  .addCommand(CommandAddCmd)
  .addCommand(CommandCreate)
  .addCommand(CommandDev)
  .addCommand(CommandBuild)
  .addCommand(CommandEnv2Json)
;
eCli.run();
