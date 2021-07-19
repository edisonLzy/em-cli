import { defineCommand } from '@em-cli/em-cli';

export default defineCommand({
  id: 'dev',
  run(args,options,command){
    console.log('dev');
  }
});
