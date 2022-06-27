import resolveCwd from 'resolve-cwd';
/**
 * 判断当前项目是不是一个 monorepo项目
 */
export function checkIsMonorepo() {
  const monorepoFiles = ['pnpm-workspace.yaml', 'lerna.json'];
  return monorepoFiles
    .map((v) => `./${v}`)
    .map(resolveCwd.silent)
    .map(Boolean)
    .some(Boolean);
}
