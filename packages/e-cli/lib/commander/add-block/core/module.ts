import * as core from '@babel/core'
import t from 'babel-types'
import fs from 'fs-extra'
import { relativeReg } from './helper/reg'
import { isAliasPath, transfromAlias } from './helper/alias'
import path from 'path'
interface BlockModuleOptions {
  entry: string
  output: string
  alias: Record<string, any>
}
export default class BlockModule {
  // 项目内依赖
  dependences: string[] = []
  // 第三方依赖
  thirdDependences: string[] = []
  constructor (private blockOptions: BlockModuleOptions) {
    this.blockOptions = blockOptions
    this.beginParseModule()
  }
  async beginParseModule () {
    const { alias, entry, output } = this.blockOptions
    const fileContent = await fs.readFile(entry)
    const ast = core.parse(fileContent.toString(), {
      sourceType: 'module',
      presets: ['@babel/preset-react'],
      plugins: ['@babel/plugin-transform-typescript']
    })
    core.traverse(ast, {
      ImportDeclaration: _path => {
        const source = _path.node.source.value
        if (relativeReg.test(source) || isAliasPath(alias, source)) {
          if (isAliasPath(alias, source)) {
            const path = transfromAlias(alias, source)
            this.dependences.push(path)
          } else {
            const dirname = path.dirname(entry)
            const _p = path.resolve(dirname, source)
            this.dependences.push(_p)
          }
        } else {
          // 添加第三方模块
          this.thirdDependences.push(source)
        }
      }
    })
    console.log(this.dependences.length);
    
    if (this.dependences.length === 0) {
      this.output(output)
    } else {
      for (const entry of this.dependences) {
        new BlockModule({
          entry,
          output,
          alias
        })
      }
    }
  }

  output (outputPath: string) {
    console.log(outputPath)
  }
}
