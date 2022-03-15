import { defineCommand } from '@em-cli/em-cli';
import { createServer } from 'vite';

export default defineCommand({
  id: 'dev',
  description: '本地开发服务器',
  async run({ args, optionsArgs }) {
    const server = await createServer({
      // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
      root: process.cwd(),
      server: {
        port: 8080,
      },
    });
    await server.listen();
  },
});
