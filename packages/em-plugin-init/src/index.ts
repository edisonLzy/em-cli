import { defineCommand } from '@em-cli/em-cli';
import { PipeLine } from 'em-pipeline';

const presets = [
  'gitignore',
  'commitlint',
  'eslint',
  'typescript',
  'jest',
  'travis'
];
export default defineCommand<any, any, {
  presets: string[]
}>({
  id: 'init',
  prompting: [{
    type: 'checkbox',
    name: 'presets',
    default: [
      'gitignore',
      'commitlint',
      'eslint',
      'typescript'
    ],
    choices: presets
  }],
  run({
    args,
    command,
    answers
  }) {
    const tasks = new PipeLine();
    // 根据preset注册任务 
    for (const preset of answers.presets) {
      tasks.tap(preset,(app,{next})=>{
        console.log('xxx');
        next();
      });
    }
    tasks.run({});
  }
});
