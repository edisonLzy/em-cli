import { FileManage, File } from '@em-cli/shared';
export class Product {
  // 产物名称
  name: string = '';
  // 需要安装的依赖
  deps: string[] = [];
  // 需要执行脚本
  shells: string[] = [];
  // 需要输出的文件
  fileManage: FileManage;
  constructor(name: string) {
    this.name = name;
    this.fileManage = new FileManage();
  }
  collectDeps(deps: string[]) {
    this.deps = [...new Set(this.deps.concat(deps))];
    return this;
  }
  collectShells(shells: string[]) {
    this.shells = [...new Set(this.shells.concat(shells))];
    return this;
  }
  collectFiles(files: File[]) {
    files.forEach(this.fileManage.addFile);
    return this;
  }
}
