import { defineFeature } from '../';
import { prettier, prettierignore, eslint, eslintIgnore } from './template';
import { deps } from './deps';
export default defineFeature({
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'Linter',
      value: 'linter',
    });
    cli.injectPrompt([
      {
        name: 'linterTools',
        when: (answers) => {
          return answers.features.includes('linter');
        },
        message: '📦 格式化代码的方式',
        type: 'checkbox',
        choices: [
          {
            name: 'eslint',
            value: 'eslint',
          },
          {
            name: 'prettier',
            value: 'prettier',
          },
        ],
        default: ['eslint', 'prettier'],
      },
    ]);
    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('linter')) {
        projectOptions.plugins.linter = {
          linterTools: answers.linterTools,
        };
      }
    });
  },
  apply(options, creator) {
    const { product } = creator;
    product
      .collectFiles(
        [
          options.linterTools.includes('eslint') && {
            path: './.eslintrc.js',
            value: eslint,
          },
          options.linterTools.includes('eslint') && {
            path: './.eslintignore',
            value: eslintIgnore,
          },
          options.linterTools.includes('prettier') && {
            path: './.prettierignore',
            value: prettierignore,
          },
          options.linterTools.includes('prettier') && {
            path: './.prettierrc',
            value: prettier,
          },
        ].filter(Boolean)
      )
      .collectDeps(deps);
  },
});
