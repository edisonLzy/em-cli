import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import { elog } from '@em-cli/shared';

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
    elog.error('file existed', `${filePath} not exist`);
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
  elog.success(`输出成功 ${outPath}`);
}
