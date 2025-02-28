import path from 'path';
import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export interface LibOptions {
  workinDir: string;
  inputFile: string;
}

function loadPresets() {
  return ['@babel/preset-env', '@babel/preset-typescript'].map((preset) => {
    return import.meta.resolve?.(preset);
  }) as unknown as string[];
}

export default async function buildLib({ workinDir, inputFile }: LibOptions) {
  const src = path.join(inputFile);

  const presets = await loadPresets();

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
        presets: presets,
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
