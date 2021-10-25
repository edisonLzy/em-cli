import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
export interface LibOptions {
  workinDir: string;
  inputFile: string;
}
export default async function buildLib({ workinDir, inputFile }: LibOptions) {
  const src = path.join(inputFile);
  console.log(src);

  const bundle = await rollup({
    input: src,
    plugins: [
      commonjs(),
      nodeResolve({
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        presets: [
          require.resolve('@babel/preset-env'),
          require.resolve('@babel/preset-typescript'),
        ],
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
}
