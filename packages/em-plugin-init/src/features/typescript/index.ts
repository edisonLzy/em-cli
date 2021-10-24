import { defineFeature } from '../';
// export default {
//   tips: '初始化 ts',
//   async fn(cwd: string) {
//     shell.cd(cwd);
//     if (shell.which('npm')) {
//       shell.exec('npm i typescript -D');
//       shell.exec('npx tsc --init');
//       logger.clearConsole(logger.done('🚀 ts 初始化完成'));
//     }
//   },
// };

export default defineFeature({
  apply() {},
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'Typescript',
      value: 'typescript',
    });
    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('typescript')) {
        projectOptions.plugins['typescript'] = {};
      }
    });
  },
});
