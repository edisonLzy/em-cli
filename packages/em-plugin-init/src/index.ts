import { defineCommand } from '@em-cli/em-cli';
import loadFeature from './features/loadFeature';
import { Creator } from './creator';

export default defineCommand({
  id: 'init',
  option: [
    ['-t,--template [template]', '模版项目地址'],
    ['-p,--project [project]', '当前工作目录', process.cwd()],
    ['-n,--name [name]', '当前项目的名称', 'name'],
  ],
  description: '初始化项目',
  async run({ optionsArgs }) {
    const { project, name } = optionsArgs;
    const features = await loadFeature();
    const creator = new Creator(name, project, features);
    await creator.create();
  },
});
