import { defineFeature } from '../';
export default defineFeature({
  name: 'linter',
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'LINTER',
      value: 'linter',
    });
    cli.injectPrompt([
      {
        name: 'linterOptions',
        when: (answers) => {
          return answers.features.includes('linter');
        },
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
        projectOptions.linterOptions = answers.linterOptions;
        projectOptions.plugins.linter = {
          tools: answers.linterOptions,
        };
      }
    });
  },
  injectPlugin() {
    console.log(';xxxxx');
  },
});
