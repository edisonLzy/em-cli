import fg from 'fast-glob';
import { support, inquirer } from '@em-cli/shared';
import { execa } from 'execa';
import { createStore } from './createStore';
import { TestFileGlob } from '../constant';
const store = createStore();

export default async function runTest() {
  const isSupported = await support(['jest', 'pnpm']);
  if (!isSupported) return;

  const fullTest = await fg(TestFileGlob, {
    onlyFiles: true,
    ignore: ['node_modules'],
  });

  const choices = fullTest.map((p) => {
    return {
      name: p,
      value: p,
    };
  });

  // find cache testFile index
  const idx = choices.findIndex((it) => {
    return it.value === store.get('testFile');
  });

  const { testFile, extraArgs } = await inquirer.prompt<{
    testFile: string;
    extraArgs: string;
  }>([
    // {
    //   type: 'autocomplete',
    //   name: 'testFile',
    //   message: 'Pick a test',
    //   initial: idx,
    //   choices: choices,
    // },
    {
      type: 'input',
      name: 'extraArgs',
      message: 'extra args to jest',
      initial: store.get('extraArgs'),
    },
  ]);

  // 添加到缓存中
  store.set('testFile', testFile);
  store.set('extraArgs', extraArgs);

  try {
    await execa(
      'pnpm',
      ['jest', '--runTestsByPath', testFile].concat(
        extraArgs.split(' ').filter(Boolean)
      ),
      {
        stdio: 'inherit',
      }
    );
  } catch (err) {
    console.log(err);
  }
}
