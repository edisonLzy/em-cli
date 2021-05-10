import { resolvePwd} from './../../helper/path';
import { BaseCommand, Options,Command} from '../../core/command';
import path from 'path';
import BlockModule from './core/module'
 interface Block {
    entry:string
    output:string
    alias:Record<string,any>
}
export class CommandAddBlock extends BaseCommand { 
     id='add-block'
     option = [['-c,--config [configFile]','区块配置文件','block-config.js']] as Options[]
     description='根据指定的入口文件,自动分析依赖，并输出block'    
     
     resolveConfig(configFile:string):Block[]{
        const configPath =resolvePwd(configFile)
        const {blocks} = require(configPath)
        return blocks
     }
     run(args: string[],optionsArgs:Record<string, any>, Command: Command) {
        const {config} = optionsArgs;
        const blocksArr = this.resolveConfig(config);
        for (const block of blocksArr) {
            const {entry,output,alias} = block;
            const module = new BlockModule({
                entry,
                alias,
                output
            });
        }
     }
}