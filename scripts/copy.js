import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copyFile(source, target) {
  const filename = path.basename(source);
  const targetFilename = path.join(target, filename);
  if (fs.existsSync(targetFilename)) return;
  fs.copyFileSync(source, targetFilename);
}

async function main() {
  const source = path.resolve(__dirname, '../packages/cli/.fatherrc.ts');
  if (!fs.existsSync(source)) return;
  const cwd = path.resolve(__dirname, '../packages');
  const targets = await fg('*', {
    onlyDirectories: true,
    cwd: path.resolve(__dirname, '../packages'),
  });
  targets
    .map((target) => {
      return path.join(cwd, target);
    })
    .forEach((target) => {
      copyFile(source, target);
    });
}
main();
