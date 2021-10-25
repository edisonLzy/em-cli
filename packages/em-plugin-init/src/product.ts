import { FileManager, VFileOptions } from 'em-fm';
export class Product {
  // 产物名称
  name: string = '';
  // 需要安装的依赖
  deps: string[] = [];
  // 需要执行脚本
  shells: string[] = [];
  // 需要输出的文件
  fileManage: FileManager;
  constructor(name: string) {
    this.name = name;
    this.fileManage = new FileManager();
  }
  collectDeps(deps: string[]) {
    this.deps = [...new Set(this.deps.concat(deps))];
    return this;
  }
  collectShells(shells: string[]) {
    this.shells = [...new Set(this.shells.concat(shells))];
    return this;
  }
  collectFiles(files: VFileOptions[]) {
    files.forEach(this.fileManage.addFile);
    return this;
  }
}
