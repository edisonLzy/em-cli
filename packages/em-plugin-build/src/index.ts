import { defineCommand } from '@em-cli/em-cli';

export default defineCommand({
  id: 'build',
  run({ args, optionsArgs }) {
    console.log('build');
  },
});
