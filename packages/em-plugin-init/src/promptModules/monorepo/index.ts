import initByPnpm from './pnpm';
import { Plugin } from '../../plugin';
import { getDirsInCurrentPath } from '@em-cli/shared';
import initByYarnAndLerna from './yarnAndLerna';
const monorepoPlugin: Plugin = (cli) => {
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
      default: ['pnpm'],
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
      if (answers.monorepoTools === 'pnpm') {
        initByPnpm({
          workinDir: projectOptions.workinDir,
          sub: answers.workspace,
        });
        return;
      }
      if (answers.monorepoTools === 'yarnAndLerna') {
        initByYarnAndLerna({
          workinDir: projectOptions.workinDir,
          sub: answers.workspace,
        });
      }
    }
  });
};

export default monorepoPlugin;
