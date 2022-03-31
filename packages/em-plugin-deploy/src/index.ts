import { defineCommand } from '@em-cli/core';
import { deployStatic } from './static';

interface DeployType {
  static: typeof deployStatic;
}
function deploy(type: keyof DeployType, dir: string) {
  const deployType = {
    static: deployStatic,
  };
  return Reflect.apply(deployType[type], null, [dir]);
}
export default defineCommand({
  id: 'deploy',
  description: '部署项目',
  option: [
    ['-t,--type <type>', '部署的类型', 'static'],
    ['-d,--workinDir [workinDir]', '当前工作路径', process.cwd()],
  ],
  async run({ optionsArgs }) {
    const { type, workinDir } = optionsArgs;
    deploy(type as keyof DeployType, workinDir);
  },
});
