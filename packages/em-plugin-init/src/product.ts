import { FileManager, FileOptions } from '@etools/fm';
import { ShellsManager } from '@em-cli/shared';

type DepType = 'devDep' | 'dev';
type Deps = string[];
export class Product {
  // 产物名称
  name: string = '';
  // 需要安装的依赖
  deps: Map<DepType, Deps>;
  // 需要执行脚本
  shells: ShellsManager;
  // 需要输出的文件
  fileManage: FileManager;
  constructor(cwd: string) {
    this.fileManage = new FileManager({
      base: cwd,
      writeFileMode: 'skip',
    });
    this.deps = new Map<DepType, Deps>([
      ['dev', []],
      ['devDep', []],
    ]);
    this.shells = new ShellsManager({
      projectDir: cwd,
    });
  }
  collectDeps(type: DepType, deps: Deps) {
    const rawDeps = this.deps.get(type)!;
    this.deps.set(type, rawDeps.concat(deps));
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
