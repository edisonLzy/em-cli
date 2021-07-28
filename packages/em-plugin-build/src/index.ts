import { defineCommand } from '@em-cli/em-cli';

export default defineCommand({
  id: 'build',
  description: 'build',
  option: [['-t,--target [target]]', '构建目标', 'lib']],
  run({ args, optionsArgs }) {
    console.log('build');
  },
});
