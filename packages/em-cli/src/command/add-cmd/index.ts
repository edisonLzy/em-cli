import {render} from 'ejs';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '@em-cli/shared';
import { BaseCommand } from '../../core/command';
import type { Options } from '../../core/command';
export class CommandAddCmd extends BaseCommand {
  static installed: boolean = false
  id = 'add-cmd'
  args = '<commandName>'
  description = 'quick add cli command'
  context = path.resolve(__dirname,'../../../')
  async run(args: string[], optionsArgs?: Record<string, any>) {
    const [commandName] = args;
    const content = this.renderTemplate(commandName);
    this.outputFile(content,path.join(this.context,'./src/command',commandName,'index.ts'),commandName);
  }
  private renderTemplate(commandName:string){
    const templatePath = path.join(this.context,'templates/cmd.ejs');
    const templateEjs = fs.readFileSync(templatePath).toString();
    return render(templateEjs,{
      commandName
    });
  }
  private async outputFile(content:string,filePath:string,commandName:string){            
    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath,content);
    logger.done(filePath,'输出文件');// 输出文件
    const commandEntryPath = path.join(this.context,'./src/command/index.ts');
    const commandEntry = fs.readFileSync(commandEntryPath).toString();
    const exportStatement = `export { Command${this.toFirstWordsUpperCase(commandName)} } from './${commandName}'`;
    if(commandEntry.indexOf(exportStatement)!==-1){
      logger.warn(`${commandName} is already existed`);
      return;
    }
    const outputContent = `${commandEntry} \n ${exportStatement}`;
    fs.writeFileSync(commandEntryPath,outputContent);
    logger.done(commandEntryPath,'替换文件');// 替换文件
    logger.done(`成功生成命令 ${commandName}`);
  }
  private toFirstWordsUpperCase(str:string){
    return str.replace(/\b\w/g,function(th){
      return th.toUpperCase();
    });}

}


