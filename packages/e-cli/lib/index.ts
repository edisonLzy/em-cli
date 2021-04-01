import {CommandAddTaro} from './commander';
import ECli from './core';

const cli = new ECli();

cli
  .addCommand(CommandAddTaro)
;

cli.run();
