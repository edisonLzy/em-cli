import { defineFeature } from '..';
import { babelConfig, test } from './template';
import { deps } from './deps';
import { pkgEnhance } from '@em-cli/shared';
export default defineFeature({
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'TestUnit',
      value: 'testUnit',
    });
    cli.injectPrompt([
      {
        name: 'testTools',
        when: (answers) => {
          return answers.features.includes('testUnit');
        },
        message: '📦 初始化的单元测试框架:',
        type: 'checkbox',
        choices: [
          {
            name: 'jest',
            value: 'jest',
          },
          {
            name: 'mocha',
            value: 'mocha',
          },
        ],
        default: ['jest'],
      },
      {
        name: 'useReact',
        message: '❓ Are you want add Enzyme for react?',
        when: (answers) => {
          return answers.testTools && answers.testTools.includes('jest');
        },
        type: 'confirm',
      },
    ]);
    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('testUnit')) {
        projectOptions.plugins['testUnit'] = {
          useReact: answers.useReact,
          testTools: answers.testTools,
        };
      }
    });
  },
  apply(options, creator) {
    const { product, projectDir } = creator;
    product
      .collectFiles(
        [
          options.testTools.includes('jest') && {
            path: './babel.config.js',
            value: babelConfig,
          },
          options.testTools.includes('jest') && {
            path: './__tests__/sum.spec.ts',
            value: test,
          },
        ].filter(Boolean)
      )
      .collectDeps('devDep', deps);

    // extendPackage
    pkgEnhance(projectDir, {
      add: {
        scripts: {
          test: 'jest',
        },
      },
      create: {
        'lint-staged': {
          '*.{js,jsx,ts,tsx}': ['eslint --fix'],
          '*.{d.ts,json,md}': ['prettier --write'],
        },
      },
    });
  },
});
