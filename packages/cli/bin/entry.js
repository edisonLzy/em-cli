#!/usr/bin/env node

import { spawn } from 'child_process';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
//
const execFilePath = resolve(__dirname, 'ee.js');
// 
const loadersDir = resolve(__dirname, '../loaders');
const loaders = ['specifier-resolution-loader.js']
                .map(l=>join(loadersDir, l))
                .join(',');
//
spawn(
  'node',
  [
    '--no-warnings',
    // 使用 import.meta.resolve API: 
    // https://nodejs.org/api/esm.html#importmetaresolvespecifier-parent
    '--experimental-import-meta-resolve',
    '--loader',
    loaders,
    execFilePath,
  ].concat(process.argv.slice(2)),
  {
    env: process.env,
    cwd: process.cwd(),
    stdio: 'inherit',
  }
).on('exit', (code) => {
  process.exit(code);
});

