import resolveCwd from 'resolve-cwd';
import { execa } from 'execa';
import logger from './logger';
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
/**
 * 通过检查是否判断是否支持一些命令
 * 比如 pnpm npm jest等等
 */

type SupportOptions = {
  cmd: string;
  args: string[];
};
const pkgManager = ['pnpm', 'npm', 'yarn'] as const;
type PM = typeof pkgManager[number];
export async function support(commands: (SupportOptions | string)[]) {
  const normalizedCommands = commands.map((cmd) => {
    if (typeof cmd === 'string') {
      return {
        cmd: cmd,
        args: ['--version'],
      };
    }
    return cmd;
  });
  const imp = async ({ cmd, args }: SupportOptions) => {
    try {
      if (pkgManager.includes(cmd as PM)) {
        await execa(cmd, args);
        logger.success(`support ${cmd}`);
      } else {
        await execa('node', [resolveCwd(cmd), ...args]);
        logger.success(`support ${cmd}`);
      }
      return true;
    } catch (e) {
      logger.error(`can't find ${cmd}, check args is ${args}`);
      return false;
    }
  };
  const result = await Promise.all(normalizedCommands.map(imp));
  return result.every(Boolean);
}
