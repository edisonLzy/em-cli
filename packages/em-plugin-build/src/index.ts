import { defineCommand } from '@em-cli/em-cli';
import { buildWithRollup } from './buildLibWithRollup';
import type { BuildExtension } from './buildLibWithRollup';
import { inquirer } from '@em-cli/shared';
import buildWithWebpack from './buildWithWebpack';
import './utils/enhanceRequire';
const choices = ['webpack', 'rollup', 'gulp', 'esbuild', 'vite'];

const buildMapping = {
  webpack: buildWithWebpack,
};
export default defineCommand({
  id: 'build',
  description: 'build',
  subCommands: [
    {
      id: 'lib',
      description: '打包库',
      option: [
        ['-p,--project [project]', '项目地址', process.cwd()],
        ['-e,--extension [extension]', '构建文件类型', '.tsx'],
      ],
      async run({ args, optionsArgs }) {
        const { project, extension } = optionsArgs;
        await buildWithRollup({
          extension: extension as BuildExtension,
          workinDir: project,
        });
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
