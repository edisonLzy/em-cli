import { PipeLine } from 'em-pipeline';
import webpack, { Configuration } from 'webpack';
import signale from 'signale';
import { merge } from 'webpack-merge';
import baseConfig from '../config/base';
import { loadConfig } from './loadConfig';
export function buildReact(workDir: string) {
  const task = new PipeLine<{
    workDir: string;
  }>();
  task
    .tap<{
      inputConfig: Configuration;
    }>('读取用户的配置文件', async ({ workDir }, { next }) => {
      const config = await loadConfig(workDir);
      next({
        inputConfig: config,
      });
    })
    .tap<{
      config: Configuration;
    }>('合并配置文件', ({ inputConfig }, { next }) => {
      const config = merge(baseConfig(workDir), inputConfig);
      next({
        config,
      });
    })
    .tap('使用webpack开始打包', ({ config }, { next }) => {
      const compiler = webpack(config);
      compiler.run((err, state) => {
        if (err) {
          signale.error(err);
        } else {
          signale.success('构建成功');
        }
      });
    });

  task.run({
    workDir,
  });
}
