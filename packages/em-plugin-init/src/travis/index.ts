import shell from 'shelljs';
const travis = `language: node_js
node_js:
  - 14.16.0
branchs:
  only:
    - master
cache:
  directories:
    - node_modules
install:
  - npm install
scripts:
  - npm test
`;
export default {
  async fn(cwd: string) {
    shell.cd(cwd);
    shell.exec(`echo "${travis}" > .travis.yml`);
  },
};
