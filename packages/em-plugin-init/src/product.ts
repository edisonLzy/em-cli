import { FileManager, FileOptions } from 'em-filemanager';
import { ShellsManager } from '@em-cli/shared';

type Deps =
  | string[]
  | Record<
      string,
      {
        deps: string[];
      }
    >;
export class Product {
  // 产物名称
  name: string = '';
  // 需要安装的依赖
  deps: ShellsManager;
  // 需要执行脚本
  shells: ShellsManager;
  // 需要输出的文件
  fileManage: FileManager;
  constructor(cwd: string) {
    this.fileManage = new FileManager({
      cwd: cwd,
      writeFileMode: 'skip',
    });
    this.deps = new ShellsManager({
      projectDir: cwd,
    });
    this.shells = new ShellsManager({
      projectDir: cwd,
    });
  }
  collectDeps(deps: Deps) {
    if (Array.isArray(deps)) {
      const depShells = ShellsManager.transformDepsToShells(deps);
      this.deps.addShells([depShells]);
    } else {
      Object.values(deps).forEach(({ deps }) => {
        this.collectDeps(deps);
      });
    }
    return this;
  }
  collectShells(shells: string[]) {
    this.shells.addShells(shells);
    return this;
  }
  collectFiles(files: FileOptions[]) {
    this.fileManage.addFile(files);
    return this;
  }
}
