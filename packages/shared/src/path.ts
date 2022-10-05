import path from 'path';
import { fileURLToPath } from 'url';

export function getDirnameAndFilename(metaUrl = import.meta.url) {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = path.dirname(__filename);
  return {
    __filename,
    __dirname,
  };
}

export function resolvePath(base: string) {
  return function (p: string) {
    return path.resolve(base, p);
  };
}
export const resolveDirname = resolvePath(getDirnameAndFilename().__dirname);
export const resolvePwd = resolvePath(process.cwd());

export const separatePath = (p: string) => {
  if (!p) return [];
  return p.split(path.sep);
};
