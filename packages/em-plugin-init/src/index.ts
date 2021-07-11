import {eslintInstall} from './dep/eslint';
import {commitLintInstall} from './dep/commitlint';
import { PipeLine } from 'em-pipeline';
/**
 * workinPath 工作目录
 * @param workinPath 
 */
export async function main (workinPath: string){
  // await eslintInstall.run(workinPath);
  // await commitLintInstall.run(workinPath);
  const task = new PipeLine<{
    cwd: string,
  }>();
  task
    .tap('install eslint', ({cwd},done)=>{
      console.log('do');
      done();
    })
    .tap('install DockerFile',()=>{
    
    });
  task.run({
    cwd: workinPath
  });
}