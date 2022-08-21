import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';
import { findUp } from 'find-up';
export default defineConfig({
  entry: ['src/index.ts'],
  // **/!(*.d).ts
  shims: true,
  legacyOutput: true,
  clean: true,
  target: 'node16',
  format: ['esm'],
  dts: true,
  esbuildPlugins: [
    {
      name: 'alias',
      setup(build) {
        build.onLoad(
          {
            filter: /.tsx?$/,
          },
          async ({ path: modulePath }) => {
            const raw = (
              await fs.promises.readFile(modulePath, 'utf-8')
            ).toString();
            const rootSrc = await findUp('src', {
              cwd: path.dirname(modulePath),
              type: 'directory',
            });
            const ext = modulePath.endsWith('ts') ? 'ts' : 'js';
            const matchResult = raw.match(/(['"])@\/(.+)\1/);
            if (!matchResult) {
              return {
                contents: raw,
                loader: ext,
              };
            }
            const [rawContent, quota, remainPath] = matchResult;
            const finalContent = raw.replace(
              rawContent,
              `${quota}${path.join(rootSrc as string, remainPath)}${quota}`
            );
            return {
              contents: finalContent,
              loader: ext,
            };
          }
        );
      },
    },
  ],
});
