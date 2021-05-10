import ejs from 'ejs';
import fs from 'fs-extra';
import path from 'path';
import * as core from '@babel/core';
import * as t from 'babel-types';
import { resolvePwd} from './../../helper/path';
import { formate } from './../../helper/eslint';
import { BaseCommand, Options,Command} from '../../core/command';
interface IResultType {
    name:string
    content:string
}
export class CommandAddTaro extends BaseCommand { 
     id='add-taro'
     option = [['-t,--title <title>','导航栏的title','标题']] as Options[]
     args='<moduleName>'
     description='自动输出taro pages 并注入到 app.config.ts 文件中'   
     
     moduleName = ''
     title = ''
     templatePath = path.resolve(__dirname,'./template');
     
     outputConfig = {
       pagesPath:resolvePwd('src/pages'),
       appJsonPath:resolvePwd('src/app.config.ts')
     }
     
     async formateAll(outputFilePath:string[]){
       for await (const outputFile of outputFilePath) {
         await formate(outputFile);
         this.logSuccess(`formate done! \n ${outputFile}`);
       }
     }
     async output(results:IResultType[],appJson:string){
       const {pagesPath,appJsonPath} = this.outputConfig;

       for await (const result of results) {
         const {name,content}  = result;
         const fillPath = path.join(pagesPath,this.moduleName,name);
         await fs.outputFile(fillPath,content,{
           encoding:'utf-8'
         });
         await formate(fillPath);
         this.logSuccess(this.logChalk.green(fillPath));
       }
       await fs.outputFile(appJsonPath,appJson);
       await formate(appJsonPath);
       this.logSuccess(this.logChalk.green(appJsonPath));
     }
     
     async asyncConfigTs(){
       const fileContentBf  = await fs.promises.readFile(this.outputConfig.appJsonPath); 
       const fileContent = fileContentBf.toString();  
       // transform  
       const result = core.transform(fileContent,{
         filename:'',
         plugins:[require.resolve('@babel/plugin-transform-typescript'),{
           visitor:{
             ObjectProperty:(path:any)=>{
               const pageNode:any = path.get('key');          
               if(pageNode.node.name=== 'pages'){
                 // 将新的path 加到 pages 数组下面  
                 const el:any = path.get('value').node; 
                 el.elements.push(t.stringLiteral(`pages/${this.moduleName}/index`));               
               }
             }
           }
         }]
       });              
       return result!.code;
     }
     async generatorFile(){
       const allTemplats = await fs.readdir(this.templatePath);
       // 得到 pages/*  结果
       const results = allTemplats.map(it=>{
         const fillPath = path.join(this.templatePath,it);
         const ejsContent = fs.readFileSync(fillPath);
         const [name] = it.split('.ejs');
         return {
           name,
           content:ejs.render(ejsContent.toString(),{
             moduleName:this.moduleName,
             title:this.title
           })
         };
       });
       // 得到app.config.ts 结果
       const appConfig = await this.asyncConfigTs();
       this.output(results,appConfig!);   
     } 
     run(args: string[],optonsArgs:Record<string, any>, Command: Command) {
       const {title} = optonsArgs;
       const [moduleName] = args;
       this.moduleName = moduleName;
       this.title = title;
       this.generatorFile();
     }
}