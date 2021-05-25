
import path from 'path';
import fs from 'fs-extra';

export function filterDir(dirs: string[], base: string) {
  // 过滤无效的目录，文件
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