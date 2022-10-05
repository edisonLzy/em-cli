#!/usr/bin/env node
import { spawn } from 'child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const execFilePath = resolve(dirname(fileURLToPath(import.meta.url)), 'ee.js');
spawn(
  'node',
  [
    '--no-warnings',
    '--experimental-specifier-resolution=node',
    '--experimental-import-meta-resolve',
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
