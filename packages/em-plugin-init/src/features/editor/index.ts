import { defineFeature } from '../';
import { vscodeConfig } from './template';

export default defineFeature({
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'Editor',
      value: 'editor',
    });
    cli.injectPrompt([
      {
        name: 'editorTools',
        when: (answers) => {
          return answers.features.includes('editor');
        },
        message: '📦 初始化编辑器的方式:',
        type: 'checkbox',
        choices: [
          {
            name: 'vscode',
            value: 'vscode',
          },
        ],
        default: 'vscode',
      },
    ]);
    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('editor')) {
        projectOptions.plugins['editor'] = {
          editorTools: answers.editorTools,
        };
      }
    });
  },
  apply(options, creator) {
    const { product } = creator;

    product.collectFiles(
      [
        options.editorTools.includes('vscode') && {
          path: './.vscode/settings.json',
          value: vscodeConfig,
        },
      ].filter(Boolean)
    );
  },
});
