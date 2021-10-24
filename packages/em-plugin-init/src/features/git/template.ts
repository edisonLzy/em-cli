export const commitLint = `module.exports = {
    extends: ['@commitlint/config-conventional'],
}
  `;

export const gitignore = `.tmp
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
