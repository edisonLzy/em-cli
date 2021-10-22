import fs from 'fs-extra';
import path from 'path';
import yaml from 'yaml';
async function createConfigFile(sub: string[], workinDir: string) {
  const config = {
    packages: sub.map((str) => `${str}/**`),
  };
  const fileName = 'pnpm-workspace.yaml';
  await fs.outputFile(path.join(workinDir, fileName), yaml.stringify(config));
}
async function createNpmrc(workinDir: string) {
  const config = `shamefully-hoist = true`;
  const fileName = '.npmrc';
  await fs.outputFile(path.join(workinDir, fileName), config);
}
export default async function initByPnpm({
  workinDir,
  sub,
}: {
  workinDir: string;
  sub: string[];
}) {
  await createConfigFile(sub, workinDir);
  await createNpmrc(workinDir);
}
