import shell from 'shelljs';
const gitignore = `.tmp
.DS_Store
node_modules
build

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
yarn.lock

# Editor directories and files
.idea
# .vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# generated by wii
index.html

# local env
.env.local

.vscode
*.local.*

`;

export default {
  tips:'正在初始化 git',
  fn:async function(cwd:string){
    if(!shell.which('git')){
      shell.echo('this script need git');
      shell.exit(1);
    }else{
      shell.cd(cwd);
      shell.exec('git init');
      shell.exec(`echo '${gitignore}' > .gitignore`);
    }
  }
};