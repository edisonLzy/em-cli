import inquirer from 'inquirer';
import { buildReact } from './react';
const buildMapping = {
  react: buildReact,
};
export default async function (workDir: string) {
  // 选择构建目标
  const { target } = await inquirer.prompt([
    {
      type: 'checkbox',
      choices: ['lib', 'react', 'vue'],
      name: 'target',
      message: '请选择构建目标',
    },
  ]);
  buildMapping[target as keyof typeof buildMapping](workDir);
}
