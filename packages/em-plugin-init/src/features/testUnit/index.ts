import { defineFeature } from '..';
import { babelConfig, test } from './template';
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
    // 初始化 babel
    //   shell.exec(`echo "${babelConfig}" > babel.config.js`);
    // 初始化 __tests__
    //   shell.exec(`echo "${test}" > sum.spec.ts`);
    // extendPackage
    // await pkgEnhance(cwd, {
    //     add: {
    //       scripts: {
    //         test: 'jest',
    //       },
    //     },
    //     create: {
    //       'lint-staged': {
    //         '*.{js,jsx,ts,tsx}': ['eslint --fix'],
    //         '*.{d.ts,json,md}': ['prettier --write'],
    //       },
    //     },
    //   });

    const { product } = creator;
    product.collectFiles(
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
    );
  },
});
