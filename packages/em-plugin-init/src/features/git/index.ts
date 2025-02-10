import { pkgEnhance } from '@em-cli/shared';
import { defineFeature } from '../';
import { deps } from './deps';
import { commitLint, gitignore } from './template';

export default defineFeature({
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'Git',
      value: 'git',
    });
    cli.injectPrompt([
      {
        name: 'gitTools',
        when: (answers) => {
          return answers.features.includes('git');
        },
        message: '📦 初始化GIT的方式:',
        type: 'checkbox',
        choices: [
          {
            name: 'husky',
            value: 'husky',
          },
          {
            name: 'gitignore',
            value: 'gitignore',
          },
          {
            name: 'commitlint',
            value: 'commitlint',
          },
        ],
        default: ['husky', 'gitignore', 'commitlint'],
      },
    ]);
    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('git')) {
        projectOptions.plugins['git'] = {
          gitTools: answers.gitTools,
        };
      }
    });
  },
  apply(options, creator) {
    const { gitTools } = options;
    const { product } = creator;
    product.collectFiles([
      {
        path: './.gitignore',
        value: gitignore,
      },
    ]);
    if (gitTools.includes('husky')) {
      product
        .collectDeps('devDep', deps['husky'].deps)
        .collectShells([
          'git init',
          'npx husky install',
          'npx husky add .husky/pre-commit "npx --no-install lint-staged"',
          'npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"',
        ]);
      pkgEnhance(creator.projectDir, {
        add: {
          scripts: {
            prepare: 'husky install',
          },
        },
      });
    }
    if (gitTools.includes('commitlint')) {
      product
        .collectFiles([
          {
            path: './commitlint.config.js',
            value: commitLint,
          },
        ])
        .collectDeps('devDep', deps['commitlint'].deps);
    }
  },
});
