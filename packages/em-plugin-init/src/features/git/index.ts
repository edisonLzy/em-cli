import { pkgEnhance } from '@em-cli/shared';
import { deps } from './deps';
import { commitLint, gitignore } from './template';
import { defineFeature } from '../';
import { Product } from './../../product';
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
    const product = new Product('git');
    product.collectFiles([
      {
        cwd: creator.projectDir,
        path: './.gitignore',
        contents: Buffer.from(gitignore),
      },
    ]);
    if (gitTools.includes('husky')) {
      product
        .collectDeps(deps['husky'].deps)
        .collectShells([
          'npx husky install',
          'npx husky add .husky/pre-commit "npx lint-staged"',
          'npx husky add .husky/commit-msg "npx commitlint --edit $1"',
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
            cwd: creator.projectDir,
            path: './commitlint.config.js',
            contents: Buffer.from(commitLint),
          },
        ])
        .collectDeps(deps['commitlint'].deps);
    }
    creator.collectProduct(product);
  },
});
