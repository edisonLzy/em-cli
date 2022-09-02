#!/usr/bin/env node
import { spawn } from 'child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const cliPath = resolve(dirname(fileURLToPath(import.meta.url)));

spawn(
  'node',
  ['--no-warnings', '--experimental-specifier-resolution=node', 'ee.js'].concat(
    process.argv.slice(2)
  ),
  {
    env: process.env,
    cwd: cliPath,
    stdio: 'inherit',
  }
).on('exit', (code) => {
  process.exit(code);
});
