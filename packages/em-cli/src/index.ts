import { CommandAddCmd,CommandCreate,CommandBuild,CommandDev} from './command';
import ECli from './core';
const eCli = new ECli();
eCli
  .addCommand(CommandAddCmd)
  .addCommand(CommandCreate)
  .addCommand(CommandDev)
  .addCommand(CommandBuild)
;
eCli.run();
