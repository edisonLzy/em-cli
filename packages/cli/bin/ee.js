#!/usr/bin/env node --experimental-specifier-resolution=node

async function start() {
  const isDev = process.env.isDev === 'true';
  const { run } = await import('../dist/esm/index.js');
  run(isDev);
}
start().then((e) => {
  process.exit(1);
});
