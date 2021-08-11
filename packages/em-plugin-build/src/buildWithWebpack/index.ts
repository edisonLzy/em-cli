import { inquirer } from '@em-cli/shared';
import { buildReact } from './react';
const buildMapping = {
  react: buildReact,
};
export default async function (workDir: string) {
  // 选择构建目标
  const { target } = await inquirer([
    {
      type: 'checkbox',
      choices: ['lib', 'react', 'vue'],
      name: 'target',
      message: '请选择构建目标',
    },
  ]);
  buildMapping[target as keyof typeof buildMapping](workDir);
}
