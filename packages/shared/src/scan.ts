import path from 'path';
import fg from 'fast-glob';
/**
 * 扫描指定目录和文件
 */
type FileMapping = (Raw: { fullPath: string; file: string }) => void;
export async function scanFiles(
  workinDir: string,
  glob: string = '*',
  mapping: FileMapping = (val) => val
) {
  const files = await fg(`${workinDir}/${glob}`, {
    onlyFiles: true,
    ignore: ['node_modules/**/*'],
  });
  return files
    .map((file) => {
      return {
        fullPath: file,
        file: path.basename(file),
      };
    })
    .map(mapping);
}
type DirMapping = (Raw: { fullPath: string; dir: string }) => void;
export async function scanDirs(
  workinDir: string,
  mapping: DirMapping = (val) => val
) {
  const dirs = await fg(`${workinDir}/*`, {
    onlyDirectories: true,
    ignore: ['node_modules/**/*'],
  });
  return dirs
    .map((dir) => {
      return {
        fullPath: dir,
        dir: path.basename(dir),
      };
    })
    .map(mapping);
}
