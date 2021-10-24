import Vinyl from 'vinyl';
export type FilterUndefined<T> = T extends undefined ? never : T;
export type RequiredVinylConstructor = FilterUndefined<
  ConstructorParameters<typeof Vinyl>[number]
>;
export type File = RequiredVinylConstructor;
export interface FileManageOptions {}
export class FileManage {
  private files: Vinyl[] = [];
  constructor(private op?: FileManageOptions) {}
  addFile = (file: File) => {
    const vinyl = new Vinyl(file);
    // 添加文件
    this.files.push(vinyl);
    return;
  };
  outFile = async () => {
    // 输出文件
    for await (const file of this.files) {
      const { extname, contents, basename } = file;
      console.log(extname, basename);
    }
  };
  get total() {
    return this.files.length;
  }
  //   get files() {
  //     return this._files;
  //   }
}
