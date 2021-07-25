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

export default {
  tips: '初始化editor',
  async fn(cwd: string) {
    shell.cd(cwd);
    shell.mkdir('.vscode');
    shell.cd('.vscode');
    shell.exec(`echo '${vscodeConfig}' > settings.json`);
  },
};
