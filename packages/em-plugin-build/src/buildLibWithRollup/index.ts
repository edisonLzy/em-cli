import { RollupOptions, OutputOptions, rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import ts from 'rollup-plugin-typescript2';
import { getFilesInCurrentPath } from '@em-cli/shared';
import inquirer from 'inquirer';
import path from 'path';
export type BuildExtension = '.tsx' | '.ts' | '.vue';
interface Options {
  extension: BuildExtension;
  workinDir: string;
}
function getBuildConfig(extension: BuildExtension): RollupOptions {
  if (extension === '.vue') {
    // TODO
    return {} as any;
  } else {
    const baseConfig = {
      external: ['react', 'react-dom', 'classnames'],
      plugins: [
        nodeResolve(),
        ts({
          useTsconfigDeclarationDir: true,
          tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
        }),
        babel(),
      ],
    };
    return baseConfig;
  }
}
async function getEntries(
  workinDir: string,
  extension: BuildExtension
): Promise<string[]> {
  const { files } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'files',
      default: `./src/index${extension}`,
      async choices() {
        return getFilesInCurrentPath(
          workinDir,
          `**/*${extension}`,
          ({ fullPath }) => {
            const relativePath = path.relative(workinDir, fullPath);
            return {
              name: relativePath,
              value: relativePath,
            };
          }
        );
      },
    },
  ]);
  return files;
}
async function build(entry: string, config: RollupOptions) {
  const bundle = await rollup({
    input: entry,
    ...config,
  });
  const defaultOutput: OutputOptions[] = [
    {
      file: `es/index.js`,
      format: 'es',
    },
    {
      file: `lib/index.js`,
      format: 'cjs',
    },
  ];
  await Promise.all(defaultOutput.map(bundle.write));
}
export async function buildWithRollup({ extension, workinDir }: Options) {
  const entries = await getEntries(workinDir, extension);
  const baseConfig = getBuildConfig(extension);
  return entries.map((entry) => {
    return build(entry, baseConfig);
  });
}
