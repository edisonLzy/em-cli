import path from 'path';
function resolvePath(base: string) {
  return function (p: string) {
    return path.resolve(base, p);
  };
}
export const resolveDirname = resolvePath(__dirname);
export const resolvePwd = resolvePath(process.cwd());