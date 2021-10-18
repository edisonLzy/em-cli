import { Plugin } from '../../plugin';
const ciPlugin: Plugin = (cli) => {
  cli.injectFeature({
    name: 'FORMAT',
    value: 'format',
  });

  cli.injectPrompt([
    {
      name: 'formatTool',
      when: (answers) => {
        return answers.features.includes('format');
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
    if (answers.features.includes('format')) {
      projectOptions['formatTool'] = answers.formatTool;
    }
  });
};

export default ciPlugin;
