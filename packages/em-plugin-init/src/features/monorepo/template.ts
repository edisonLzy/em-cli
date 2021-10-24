// 'lerna.json'
// packages: sub.map((s) => `${s}/*`),
export const lernaConfig = {
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

// .npmrc
export const npmrc = 'shamefully-hoist = true';

// pnpm-workspace.yaml
const pnpmWorkspace = {
  //   packages: sub.map((str) => `${str}/**`),
};
