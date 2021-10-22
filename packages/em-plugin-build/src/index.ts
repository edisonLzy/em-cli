import { defineCommand } from '@em-cli/em-cli';
import { buildWithRollup } from './buildLibWithRollup';
import type { BuildExtension } from './buildLibWithRollup';
import buildWithWebpack from './buildWithWebpack';
import './utils/enhanceRequire';
import buildSFC, { SFCOptions } from './buildSFC';
const choices = ['webpack', 'rollup', 'gulp', 'esbuild', 'vite'];

const buildMapping = {
  webpack: buildWithWebpack,
};
export default defineCommand({
  id: 'build',
  description: 'build',
  subCommands: [
    {
      id: 'sfc',
      description: '单文件组件打包',
      option: [
        ['-p,--project [project]', '项目地址', process.cwd()],
        ['-t,--target [target]', '构建目标', 'react'],
      ],
      async run({ args, optionsArgs }) {
        const { project: workinDir, target } = optionsArgs;
        await buildSFC({
          workinDir,
          target: target as SFCOptions['target'],
        });
      },
    },
    {
      id: 'lib',
      description: 'ts库打包',
      option: [['-p,--project [project]', '项目地址', process.cwd()]],
      async run({ args, optionsArgs }) {
        const { project } = optionsArgs;
      },
    },
  ],
  async run({ args, optionsArgs }) {
    // const { project } = optionsArgs;
    // const { bundle } = await inquirer([
    //   {
    //     name: 'bundle',
    //     type: 'checkbox',
    //     choices: choices,
    //     message: '选择打包工具',
    //   },
    // ]);
    // buildMapping[bundle as keyof typeof buildMapping](project);
  },
});
