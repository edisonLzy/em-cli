import {eslintInstall} from './dep/eslint';
import {commitLintInstall} from './dep/commitlint';
/**
 * workinPath 工作目录
 * @param workinPath 
 */
export async function main (workinPath: string){
  // await eslintInstall.run(workinPath);
  await commitLintInstall.run(workinPath);
}