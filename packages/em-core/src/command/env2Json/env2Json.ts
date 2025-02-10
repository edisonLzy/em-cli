import path from 'path';
import fs from 'fs-extra';
import prettier from 'prettier';
import { logger } from '@em-cli/shared';

function toJson(content: string) {
  return `{
   ${content.replace(/(\w+)=(.+)\s?/gi, '"$1":"$2",')}
  }`;
}

export async function env2Json(
  filename: string,
  outputfile: string,
  cwd: string = process.cwd()
) {
  const filePath = path.join(cwd, filename);
  const outPath = path.join(cwd, outputfile);
  const isExist = await fs.pathExists(filePath);
  if (!isExist) {
    logger.error('file existed', `${filePath} not exist`);
    return;
  }
  const content = await (await fs.readFile(filePath)).toString();
  const json = await toJson(content);
  await fs.writeFile(
    outPath,
    prettier.format(json, {
      parser: 'json',
    })
  );
  logger.success(`输出成功 ${outPath}`);
}
