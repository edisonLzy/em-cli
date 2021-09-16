import { Plugin } from '../../plugin';
const formatPlugin: Plugin = (cli) => {
  cli.injectFeature({
    name: 'CI',
    value: 'ci',
  });

  cli.injectPrompt([
    // {
    //   name: 'dockerFile',
    //   when: (answers) => answers.features.includes('ci'),
    //   type: 'list',
    //   choices:[{
    //     name:""
    //   }]
    // },
  ]);
  cli.onPromptComplete((answers, projectOptions) => {});
};

export default formatPlugin;
