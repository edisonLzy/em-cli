import { build } from 'esbuild';
import path from 'path';
import type { BuildOptions } from 'esbuild';
import shell from 'shelljs';
import { PipeLine } from '@etools/pipeline';
import glob from 'glob';
export default async function (workDir: string, options?: BuildOptions) {
  const task = new PipeLine<{
    cwd: string;
  }>();
  task.tap<{
    files: string[];
  }>('获取入口文件', async ({ cwd }, { next }) => {
    glob(
      'src/*.ts',
      {
        cwd,
      },
      (err, files) => {
        next({
          files,
        });
      }
    );
  });
  task.tap('构建esbuild配置', async (app, { next }) => {
    const { files } = app as any;
    const entries = files.map((file: string) => {
      return path.join(workDir, file);
    });
    await build({
      entryPoints: entries,
      format: 'cjs',
      outdir: path.join(workDir, 'lib'),
      charset: 'utf8',
      minify: true,
    });
    next();
  });

  task.tap('输出类型声明文件', async (app, { next }) => {
    shell.exec('tsc');
  });
  task.run({
    cwd: workDir,
  });
  //   await build(options);
}
