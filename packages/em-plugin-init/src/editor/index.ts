import shell from 'shelljs';
const vscodeConfig = `
{
    "cSpell.words": [
        "evanzyli",
        "lizhiyu",
        "vite"
    ]
}
`;

const prettierIgnore = `build/
dist/
public
**/*.md
**/*.svg
**/*.ejs
**/*.html
package.json
.gitignore
.prettierignore
yarn.lock
yarn-error.log
package-lock.json`;

const editorConfig = `# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true`;

export default {
  tips:'初始化editor',
  async fn(cwd:string){
    shell.cd(cwd);
    shell.exec(`echo '${prettierIgnore}' > .prettierignore`);
    shell.exec(`echo '${editorConfig}' > .editorConfig`);
    shell.mkdir('.vscode');
    shell.cd('.vscode');
    shell.exec(`echo '${vscodeConfig}' > settings.json`);
  }
};