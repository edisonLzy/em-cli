import { defineConfig } from 'father';
// https://github.com/umijs/father/blob/master/docs/config.md
export default defineConfig({
    // 以下为 esm 配置项启用时的默认值，有自定义需求时才需配置
    esm: {
      input: 'src', // 默认编译目录
      transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
      platform: 'node',
      output:'dist',
    },
    extraBabelPlugins: [
      '@babel/plugin-syntax-import-assertions'
    ]
})