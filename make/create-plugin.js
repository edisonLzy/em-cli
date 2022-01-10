'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[插件名称]必填 - Please enter new plugin name');
  process.exit(1);
}
