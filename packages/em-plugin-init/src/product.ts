import { FileManager, FileOptions } from 'em-filemanager';
export class Product {
  // 产物名称
  name: string = '';
  // 需要安装的依赖
  deps: string[] = [];
  // 需要执行脚本
  shells: string[] = [];
  // 需要输出的文件
  fileManage: FileManager;
  constructor(cwd: string) {
    this.fileManage = new FileManager({
      cwd: cwd,
      writeFileMode: 'skip',
    });
  }
  collectDeps(deps: string[]) {
    this.deps = [...new Set(this.deps.concat(deps))];
    return this;
  }
  collectShells(shells: string[]) {
    this.shells = [...new Set(this.shells.concat(shells))];
    return this;
  }
  collectFiles(files: FileOptions[]) {
    this.fileManage.addFile(files);
    return this;
  }
}
