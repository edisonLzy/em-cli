#!/usr/bin/env node --experimental-specifier-resolution=node

async function start() {
  const isDev = process.env.isDev === 'true';
  const module = await import('../dist/esm/index.js');
  //   console.log(module);
  //   return import('../lib/index.js');
}
start();
