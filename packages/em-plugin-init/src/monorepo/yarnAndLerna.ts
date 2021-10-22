import fs from 'fs-extra';
import path from 'path';
import { pkgEnhance } from '@em-cli/shared';
async function createLernaConfig(sub: string[], workinDir: string) {
  const config = {
    packages: sub.map((s) => `${s}/*`),
    npmClient: 'yarn',
    version: 'independent',
    useWorkspaces: true,
    ignoreChanges: ['**/__tests__/**', '**/*.md', '**/package-log.json'],
    command: {
      publish: {
        registry: 'https://registry.npmjs.org/',
        conventionalCommits: true,
        message: 'chore(release): publish %v',
      },
    },
  };
  const fileName = 'lerna.json';
  await fs.outputJSON(path.join(workinDir, fileName), config, {
    spaces: 2,
  });
}

async function modifyPkgJson(sub: string[], workinDir: string) {
  await pkgEnhance(workinDir, {
    create: {
      private: true,
      workspaces: sub.map((s) => `${s}/*`),
    },
    add: {
      devDependencies: {
        lerna: '^4.0.0',
      },
      scripts: {
        bootstrap: 'yarn',
      },
    },
  });
}
export default async function initByYarnAndLerna({
  workinDir,
  sub,
}: {
  workinDir: string;
  sub: string[];
}) {
  await createLernaConfig(sub, workinDir);
  await modifyPkgJson(sub, workinDir);
}
