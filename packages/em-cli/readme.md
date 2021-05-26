# em-cli 脚手架

## 环境初始化

### 配置 jest

> https://jestjs.io/zh-Hans/docs/getting-started

### 配置 husky

### 调试

**开启 sourcemap 直接调试**

> https://code.visualstudio.com/docs/typescript/typescript-tutorial

1. F5 选择 Node.js 即可调试

## 开发

### commander 命令式交互

### log-symbols 输出样式

> https://www.npmjs.com/package/log-symbols

# Q & A

1. tsconfig.json 配置 别名 但是 tsc 不解析的问题

``` json
{
  "baseUrl": "./",
  "paths": {
    "@/*": ["lib/*"]
  }
}
```
