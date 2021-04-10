import {CommandAddTaro} from './commander';
import EmCli from './core';

const emCli = new EmCli();

emCli
  .addCommand(CommandAddTaro)
;

emCli.run();
