import { getDirsInCurrentPath } from '@em-cli/shared';
import { defineFeature } from '../';
export default defineFeature({
  name: 'monorepo',
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'MONOREPO',
      value: 'monorepo',
    });
    cli.injectPrompt([
      {
        name: 'monorepoTools',
        when: (answers) => {
          return answers.features.includes('monorepo');
        },
        message: '初始化monorepo的方式',
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
        message: '子包目录',
        type: 'checkbox',
        default: ['packages'],
        when: (answers) => {
          return answers.features.includes('monorepo');
        },
        choices: async () => {
          return getDirsInCurrentPath(process.cwd(), ({ fullPath, dir }) => {
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
  injectPlugin() {
    console.log(';yyyy');
  },
});
