import { parallel } from 'gulp';
import { execa } from 'execa';
import { pkgEnhance } from '@em-cli/shared';
import createBuildCompTask from './buildComp';
import createBuildStyleTask from './buildStyle';

/**
 *  扩展 package.json文件
 */
async function enhancePkg() {
  return await pkgEnhance(process.cwd(), {
    add: {
      peerDependencies: {
        react: '^17.0.2',
        'react-dom': '^17.0.2',
      },
      devDependencies: {
        '@types/react': '^17.0.30',
        '@types/react-dom': '^17.0.9',
      },
    },
    create: {
      files: ['lib', 'es', 'style'],
      sideEffects: ['style/*'],
      main: 'lib/index.js',
      module: 'es/index.js',
      typings: 'typings',
    },
  });
}
/**
 * 输出 类型申明文件 文件
 */

async function outputTypings() {
  return await execa('npx', ['tsc'], {
    cwd: process.cwd(),
  });
}
export default parallel(
  createBuildCompTask(),
  createBuildStyleTask(),
  enhancePkg,
  outputTypings
);
