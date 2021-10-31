import { pkgEnhance, scanDirs } from '@em-cli/shared';
import { defineFeature } from '../';
import { lernaConfig, npmrc, pnpmWorkspace } from './template';
export default defineFeature({
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'Monorepo',
      value: 'monorepo',
    });
    cli.injectPrompt([
      {
        name: 'monorepoTools',
        when: (answers) => {
          return answers.features.includes('monorepo');
        },
        message: '📦 初始化monorepo的方式:',
        type: 'list',
        choices: [
          {
            name: 'yarn+lerna',
            value: 'yarnAndLerna',
          },
          {
            name: 'pnpm',
            value: 'pnpm',
          },
        ],
        default: 'pnpm',
      },
      {
        name: 'workspace',
        message: '📁 子包目录:',
        type: 'checkbox',
        default: ['packages'],
        when: (answers) => {
          return !!answers.monorepoTools;
        },
        choices: async () => {
          return scanDirs(process.cwd(), ({ fullPath, dir }) => {
            return {
              name: dir,
              value: dir,
            };
          });
        },
      },
    ]);
    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('monorepo')) {
        projectOptions.plugins['monorepo'] = {
          type: answers.monorepoTools,
          workspace: answers.workspace,
        };
        projectOptions.monorepoOptions = {
          type: answers.monorepoTools,
          workspace: answers.workspace,
        };
      }
    });
  },
  apply(options, creator) {
    const { product, projectDir } = creator;
    const { type, workspace = [] } = options;
    if (type === 'yarnAndLerna') {
      product.collectFiles([
        {
          path: './lerna.json',
          value: lernaConfig,
        },
      ]);
      pkgEnhance(projectDir, {
        create: {
          private: true,
          workspaces: workspace.map((w: string) => `${w}/*`),
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
    if (type === 'pnpm') {
      product.collectFiles([
        {
          path: './pnpm-workspace.yaml',
          value: pnpmWorkspace,
        },
        {
          path: './.npmrc',
          value: npmrc,
        },
      ]);
    }
  },
});
