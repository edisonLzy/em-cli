import path from 'path';
export function resolvePath(base: string) {
  return function (p: string) {
    return path.resolve(base, p);
  };
}
export const resolveDirname = resolvePath(__dirname);
export const resolvePwd = resolvePath(process.cwd());

export const separatePath = (p: string) => {
  if (!p) return [];
  return p.split(path.sep);
};
