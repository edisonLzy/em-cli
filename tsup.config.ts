// https://tsup.egoist.dev/#es5-support
import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';
export default defineConfig({
  entry: ['src/index.ts'],
  legacyOutput: true,
  format: ['esm'],
  clean: true,
  dts: true,
  noExternal: [
    'terminal-kit',
    'jsonfile',
    'signale',
    'inquirer-checkbox-plus-prompt',
  ],
  // esbuildPlugins: [
  //   {
  //     name: 'inject-file-scope-variables',
  //     setup(build) {
  //       build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
  //         const contents = await fs.promises.readFile(args.path, 'utf8');
  //         const injectValues = `
  //            const dirname = ${JSON.stringify(path.dirname(args.path))};
  //            const filename = ${JSON.stringify(args.path)};
  //            `;
  //         return {
  //           loader: args.path.endsWith('ts') ? 'ts' : 'js',
  //           contents: injectValues + contents,
  //         };
  //       });
  //     },
  //   },
  // ],
});
