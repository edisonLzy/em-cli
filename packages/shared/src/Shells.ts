import shelljs from 'shelljs';
import signale from 'signale';
type Shell = string;
type Dep = string;
type ShellSuccess = {
  type: 'success';
};
type ShellError = {
  type: 'error';
  shell: Shell;
};
type ShellResult = ShellSuccess | ShellError;

interface ShellsManagerOptions {
  projectDir: string;
}

class ShellsManager {
  success: ShellSuccess[] = [];
  error: ShellError[] = [];
  shells: Shell[] = [];
  static transformDepsToShells(deps: Dep[]) {
    const depShells = deps.join(' ');
    return `pnpm i ${depShells}`;
  }
  constructor(private op: ShellsManagerOptions) {}
  private processSingleShell(shell: Shell) {
    return new Promise<ShellResult>((resolve, reject) => {
      const { code } = shelljs.exec(shell, {
        cwd: this.op.projectDir,
      });
      if (code !== 0) {
        resolve({
          type: 'error',
          shell: shell,
        });
      } else {
        resolve({
          type: 'success',
        });
      }
    });
  }
  addShells(shells: Shell[]) {
    this.shells = [...new Set(this.shells.concat(shells))];
  }
  async runShells() {
    if (this.shells.length === 0) {
      return;
    }
    signale.pending('begin to run shells');
    for (const shell of this.shells) {
      const res = await this.processSingleShell(shell);
      const type = res.type;
      if (type === 'error') {
        this.error.push(res);
      } else {
        this.success.push(res);
      }
    }
    // 输出日志
    const errorLogs = this.error.map((it) => {
      return it.shell + '\r\n';
    });
    signale.success(`🙆‍♂️ success run ${this.success.length} shells`);
    signale.error(`🙅 error run ${this.error.length} shells,you can exec your shelf
    ${errorLogs}
    `);
  }
}
export default ShellsManager;
