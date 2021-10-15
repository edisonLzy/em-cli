import { defineCommand } from '@em-cli/em-cli';
import buildWithEsbuild from './buildLibWithEsbuild';
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
  option: [
    ['-p,--project [project]', '项目地址', process.cwd()],
    ['-t,--target [target]', '构建目标', 'lib'],
  ],
  async run({ args, optionsArgs }) {
    const { project } = optionsArgs;
    const { bundle } = await inquirer([
      {
        name: 'bundle',
        type: 'checkbox',
        choices: choices,
        message: '选择打包工具',
      },
    ]);
    buildMapping[bundle as keyof typeof buildMapping](project);
  },
});
