import path from 'path';
import fg from 'fast-glob';
import pMap from 'p-map';
import { defineCommand } from '@em-cli/em-cli';
import { Creator } from './creator';

const promptModulesPath = path.resolve(__dirname, 'promptModules');

async function loadFeature(p: string) {
  const feature = await import(p);
  return feature.default;
}
async function getAllFeature() {
  const featurePaths = await fg(`${promptModulesPath}/**/index.*`, {
    onlyFiles: true,
  });
  const features = await pMap(featurePaths, loadFeature);
  return features;
}
export default defineCommand({
  id: 'init',
  option: [
    ['-t,--template [template]', '模版项目地址'],
    ['-p,--project [project]', '当前工作目录', process.cwd()],
  ],
  description: '初始化项目',
  async run({ optionsArgs }) {
    const { project } = optionsArgs;
    const features = await getAllFeature();
    const creator = new Creator(features);
    await creator.create(project);
    // // notify for update
    // updateNotifier({ pkg: require('../package.json') }).notify();
    // const { template, project } = optionsArgs;
    // if (template) {
    //   // 拉取模版
    // }
    // // 获取用户需要安装的预设
    // const answers = await inquirer([
    //   {
    //     type: 'checkbox',
    //     name: 'presets',
    //     default: ['ci', 'git', 'eslint'],
    //     choices: Object.keys(presets),
    //   },
    // ]);
    // // 根据preset注册任务
    // for await (const preset of answers.presets) {
    //   const { fn } = presets[preset as keyof typeof presets];
    //   await fn(project);
    // }
  },
});
