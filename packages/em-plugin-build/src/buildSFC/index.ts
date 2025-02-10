/**
 * 单文件打包
 * react / vue
 */
import { execa } from 'execa';
import { pathHelper } from '@em-cli/shared';
import buildVue from './vue';
type SFCTarget = 'react' | 'vue';

const { __dirname } = pathHelper.getDirnameAndFilename();

export interface SFCOptions {
  target: SFCTarget;
  workinDir: string;
}

export default async function buildSFC({
  target,
  workinDir = process.cwd(),
}: SFCOptions) {
  try {
    if (target === 'react') {
      await execa(
        'npx',
        ['gulp', '-f', './react/gulpfile.js', '--cwd', workinDir],
        {
          cwd: __dirname,
          stdout: 'inherit',
        }
      );
    }
    if (target === 'vue') {
      buildVue({
        workinDir: workinDir,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
