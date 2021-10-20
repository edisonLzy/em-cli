import shell from 'shelljs';

const commitLint = `module.exports = {
    extends: ['@commitlint/config-conventional'],
}
  `;

export default {
  tips: '初始化 husky 和 commitlint',
  async fn(cwd: string) {
    if (shell.which('npm')) {
      shell.cd(cwd);
      if (shell.cat('package.json').code !== 0) {
        //TODO 是否可以交互式初始化
        shell.exec('npm init -y');
      }
      shell.exec(
        'npm i husky lint-staged @commitlint/config-conventional commitlint -D'
      );
      shell.exec('npx husky install');
      shell.exec('npx husky add .husky/pre-commit "npx lint-staged"');
      shell.exec('npx husky add .husky/commit-msg "npx commitlint --edit $1"');
      shell.exec(`echo "${commitLint}" > commitlint.config.js`);
    } else {
      shell.echo('this script need npm');
      shell.exit(1);
    }
  },
};
