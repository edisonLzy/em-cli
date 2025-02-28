import path from 'path';
import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
interface Options {
  workinDir: string;
  inputFiles: string;
}

export default function (
  { workinDir, inputFiles }: Options = {
    workinDir: process.cwd(),
    inputFiles: 'src/index.tsx',
  }
) {
  return async function buildComponent() {
    const src = path.join(workinDir, inputFiles);
    const presets = await import.meta.resolve?.('@em-presets/babel');
    const bundle = await rollup({
      input: src,
      external: [/react/, 'classnames'],
      plugins: [
        commonjs(),
        nodeResolve({
          extensions: ['.tsx', '.ts', '.jsx', '.js'],
        }),
        babel({
          babelHelpers: 'runtime',
          extensions: ['.tsx', '.ts', '.jsx', '.js'],
          presets: [presets as string],
        }),
      ],
    });
    await Promise.all([
      bundle.write({
        file: './lib/index.js',
        format: 'cjs',
      }),
      bundle.write({
        file: './es/index.js',
        format: 'es',
      }),
    ]);
  };
}
