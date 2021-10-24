import { Product } from './../../product';
// shell.exec(`echo '${dockerFile}' > DockerFile`);
// shell.exec(`echo '${jenkinsfile}' > Jenkinsfile`);

import { defineFeature } from '../';
import { dockerFile, jenkinsfile, travis } from './template';

export default defineFeature({
  injectPrompt(cli) {
    cli.injectFeature({
      name: 'CiCd',
      value: 'cicd',
    });
    cli.injectPrompt([
      {
        name: 'cicdTools',
        when: (answers) => {
          return answers.features.includes('cicd');
        },
        type: 'checkbox',
        message: '📦 初始化cicd的方式:',
        choices: [
          {
            name: 'dockerFile',
            value: 'DockerFile',
          },
          {
            name: 'jenkinsfile',
            value: 'Jenkinsfile',
          },
          {
            name: 'travis',
            value: 'travis.yaml',
          },
        ],
        default: ['Jenkinsfile', 'DockerFile'],
      },
    ]);

    cli.onPromptComplete((answers, projectOptions) => {
      if (answers.features.includes('cicd')) {
        projectOptions.plugins['cicd'] = {
          cicdTools: answers.cicdTools,
        };
      }
    });
  },
  apply(options, creator) {
    const product = new Product('CiCd');
    product.collectFiles(
      [
        options.cicdTools.includes('DockerFile') && {
          cwd: creator.projectDir,
          path: './DockerFile',
          contents: Buffer.from(dockerFile),
        },
        options.cicdTools.includes('Jenkinsfile') && {
          cwd: creator.projectDir,
          path: './Jenkinsfile',
          contents: Buffer.from(jenkinsfile),
        },
        options.cicdTools.includes('travis.yaml') && {
          cwd: creator.projectDir,
          path: './travis.yaml',
          contents: Buffer.from(travis),
        },
      ].filter(Boolean)
    );
    creator.collectProduct(product);
  },
});
