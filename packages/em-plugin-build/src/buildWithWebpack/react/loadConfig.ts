import fs from 'fs-extra';
import { resolveConfigFile } from '../utils/configFile';

export async function loadConfig(workDir: string) {
  let webpackPath = '';
  const webpackConfigPaths = resolveConfigFile(workDir);
  for (let i = 0; i < webpackConfigPaths.length; i++) {
    const filePath = webpackConfigPaths[i];
    if (fs.pathExistsSync(filePath)) {
      webpackPath = filePath;
      break;
    }
  }
  if (webpackPath) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const appConfig = await import(webpackPath);
    return appConfig.default || appConfig;
  } else {
    return {};
  }
}
