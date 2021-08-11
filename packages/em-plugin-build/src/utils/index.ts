import { resolve } from 'path';
export const resolveCwdPath = (cwd: string) => (path: string) =>
  resolve(cwd, path);
