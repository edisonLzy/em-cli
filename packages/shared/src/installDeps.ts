import { installPackage } from '@antfu/install-pkg';
import { checkIsMonorepo } from './environment';
import logger from './logger';
/**
 * base @antfu/install-pkg
 * support monorepo project detect
 * @param opt
 */

export const installPkg: typeof installPackage = (name, options) => {
  const isMonorepo = checkIsMonorepo();
  let _options = options;
  if (isMonorepo) {
    // yarn workspace and pnpm workspace both use -w flag install pkg on root
    logger.info('Detect is monorepo project');
    _options = {
      ..._options,
      additionalArgs: (_options?.additionalArgs ?? []).concat('-w'),
    };
  }
  return installPackage(name, _options).then((v) => {
    logger.success('Install Deps Success');
    return v;
  });
};
