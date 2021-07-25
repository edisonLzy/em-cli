import shell from 'shelljs';
import { logger, spin, pkgEnhance } from '@em-cli/shared';
import { PipeLine } from 'em-pipeline';
const test = `
function sum(a:number,b:number){
    return a + b;
}
test('1+1',()=>{
    expect(sum(1,1)).toBe(2)
})
`;

const babelConfig = `
module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ]
  }  
`;
export default {
  tips: '初始化 jest',
  async fn(cwd: string) {
    const task = new PipeLine<{
      cwd: string;
    }>();
    task.tap('初始化 babel', async (app, { next }) => {
      if (shell.which('npm')) {
        if (shell.exec('npx tsc').code !== 0) {
          shell.exec('npm i typescript -D');
        }
        shell.cd(cwd);
        shell.exec(`echo "${babelConfig}" > babel.config.js`);
        next();
      }
    });
    task.tap('初始化 __test__', async (app, { next }) => {
      shell.mkdir('__test__');
      shell.cd('__test__');
      shell.exec(`echo "${test}" > sum.spec.ts`);
      next();
    });
    task.tap('安装依赖', async (app, { next }) => {
      spin.logWithSpinner('🚀', '正在安装依赖');
      shell.exec(
        'npm i @babel/preset-typescript @babel/preset-env @babel/core jest ts-jest @types/jest -D'
      );
      spin.stopSpinner();
      next();
    });
    task.tap('修改pkg', async ({ cwd }) => {
      await pkgEnhance(cwd, {
        add: {
          scripts: {
            test: 'jest',
          },
        },
        create: {
          'lint-staged': {
            '*.{js,jsx,ts,tsx}': ['eslint --fix'],
            '*.{d.ts,json,md}': ['prettier --write'],
          },
        },
      });
      logger.clearConsole(logger.done('🚀 jest 初始化完成'));
    });
    task.run({
      cwd: cwd,
    });
  },
};
