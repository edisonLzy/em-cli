import { defineFeature } from '../';
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
  apply(api, options) {
    console.log(api, options);
  },
});
