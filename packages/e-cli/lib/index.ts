import {CommandAddTaro,CommandAddBlock} from './commander';
import EmCli from './core';

const emCli = new EmCli();

emCli
  .addCommand(CommandAddTaro)
  .addCommand(CommandAddBlock)
;

emCli.run();
