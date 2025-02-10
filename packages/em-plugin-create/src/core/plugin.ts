import path from 'path';
import { getConfigKey } from '@em-cli/core';
import fs from 'fs-extra';
import { logger, formate } from '@em-cli/shared';
import { renderMain, renderPkg, renderRm, renderTsConfig } from './template';
interface Opt {
  name: string;
  workinDir: string;
}

async function outputFile(p: string, content: string) {
  await fs.outputFile(p, content);
  if (!(path.extname(p) === '.json')) {
    await formate(p);
  }
  logger.info('success create %s', p);
}

export async function createPlugin({ name }: Opt) {
  // 获取cli地址
  const pluginUrl = await getConfigKey('CLI_PLUGIN_DIR');
  const outDir = path.join(pluginUrl, `em-plugin-${name}`);
  await fs.ensureDir(outDir);
  logger.info('success create %s', outDir);
  // 输出main 文件
  const mainPath = path.join(outDir, 'src', 'index.ts');
  const mainContent = renderMain(name);
  outputFile(mainPath, mainContent);
  // 输出 pkg
  const pkgPath = path.join(outDir, 'package.json');
  const pkgContent = renderPkg(name);
  outputFile(pkgPath, pkgContent);
  // 输出 tsconfig
  const tsconfigPath = path.join(outDir, 'tsconfig.json');
  const tsContent = renderTsConfig();
  outputFile(tsconfigPath, tsContent);
  // 输出 readme
  const readmePath = path.join(outDir, 'readme.md');
  const readmeContent = renderRm(name);
  outputFile(readmePath, readmeContent);
  // 输出 __tests__
  fs.ensureDir(path.join(outDir, '__tests__'));
}
