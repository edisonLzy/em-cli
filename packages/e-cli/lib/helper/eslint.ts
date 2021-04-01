import {ESLint} from 'eslint';
// TODO  https://eslint.org/docs/developer-guide/nodejs-api#-eslintlintfilespatterns
/**
 * 根据指定的eslint配置文件,输出格式化后的代码
 */
export async function formate(filePath:string){
  const eslint = new ESLint({
    fix:true
  });
  const result = await eslint.lintFiles(filePath);
  await ESLint.outputFixes(result);
}