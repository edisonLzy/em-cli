import path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';
/**
 * 过滤无效的目录，文件
 * @param dirs
 * @param base
 * @returns
 */
export function filterDir(dirs: string[], base: string) {
  const validateDir = dirs.reduce((acc: string[], cur: string) => {
    const fullPath = path.join(base, cur);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      acc.push(fullPath);
    }
    return acc;
  }, []);
  return validateDir;
}

/**
 * 获取当前目录下面以及子目录下面的文件
 */
type Mapping = (Raw: { fullPath: string; file: string }) => void;
export async function getFilesInCurrentPath(
  workinDir: string,
  glob: string = '*',
  mapping: Mapping = (val) => val
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
