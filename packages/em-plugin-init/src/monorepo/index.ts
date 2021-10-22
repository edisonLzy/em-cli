import initByPnpm from './pnpm';
import { InjectPrompt } from '../promptModules';
import { getDirsInCurrentPath } from '@em-cli/shared';
import initByYarnAndLerna from './yarnAndLerna';
const monorepoPlugin: InjectPrompt = (cli) => {
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
      projectOptions.plugin['plugin-monorepo'] = {
        type: answers.monorepoTools,
        workspace: answers.workspace,
      };
      projectOptions.monorepoOptions = {
        type: answers.monorepoTools,
        workspace: answers.workspace,
      };
    }
  });
};

export default monorepoPlugin;
