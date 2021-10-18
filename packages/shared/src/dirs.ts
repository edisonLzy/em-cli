import fg from 'fast-glob';
import path from 'path';
/**
 * 获取当前路径下的所有文件
 * @param workinDir
 */
type Mapping = (Raw: { fullPath: string; dir: string }) => void;
export async function getDirsInCurrentPath(
  workinDir: string,
  mapping: Mapping = (val) => val
) {
  const dirs = await fg(`${workinDir}/*`, {
    onlyDirectories: true,
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
