# em-cli

- [] 本地开发服务器
- [] 构建
- [] 远程部署
- [] 多种运行环境, node API 和 命令行

## 命令开发流程

1. 收集用户信息

2. 转化动态内容

3.

## 安装

```shell
# 安装 cli 工具
npm i em-cli -g
# 查看是否成功
ee -v
```

## 项目初始化

- [] 依赖自动安装

```shell
ee init
```

### [] 基于模版创建项目

### [x] 基于现有的项目进行工程化改造

## 本地服务器

### [] 提供 mock 服务

### [] vite 和 webpack-dev-server

## 构建

```shell
ee build --env [环境标识]
```

### [] web 项目构建

### [] 库构建

### [] 环境区分

> 针对不同的环境进行构建。testing | prod | dev

## 部署

## 调试

1. tsconfig.json 添加 `sourceMap:true`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./",
    "declarationDir": "./typings",

    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["bin/*", "lib/**/*"]
}
```

2. 在 Javascript Debug Terminal 中执行命令

```shell
ee template create test
```

## 开始

1. 使用 lerna 初始化项目和发布项目

```shell
lerna init
```

2. 使用 yarn workspace 管理依赖和安装依赖

> yarn 会自动创建包之间的软链接

```shell
# 安装依赖
yarn
# 添加依赖到指定包
yarn workspace [packageName] add  [npmPackageName]
```

## 问题记录

**lerna Command failed with exit code 128: git rev-parse HEAD**

> https://github.com/lerna/lerna/issues/763: 提交本地仓库的代码再 import

```shell
# cmd
lerna import [path]
# ex1
lerna import /Users/evanzyli/Desktop/owner/em-cli
```

**lerna ERR! E402 You must sign up for private packages**

> https://www.yuque.com/iyum9i/uur0qi/iyg4fz: 作用域包需要 "access": "public"

**发布 scope 包**

1.npm 官网新建 em-cli.

2. 更改自己的包名称 package.json： name: "@em-cli/xxxxxxx"

3. 先登录，再发布 npm login. 用户名密码如果忘了，去官网查。

4. 添加 --access public 到 pkg.json 中

```json
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
```

**fatal: tag '@em-cli/shared@0.0.2' already exists**

> lerna 每次发布都会打个 git tag

```shell
 # 删除本地的所有的tag
 git tag | xargs git tag -d
```

**发布含有 bin 的 npm 包的时请确保 bin 目录在发布的文件中**

> 通过 package.json 的 files 字段指定

```json
 "files": [
    "lib",
    "bin"
  ],
```

## 常用命令

```shell
lerna publish from-package
```

## 错误

1.  TypeError: em_cli_1.defineCommand is not a function

**导出文件**

```ts
export * from './core/command';
export * from './core/base';
```

**导入文件**

```ts
import { defineCommand } from '@em-cli/core';
// defineCommand is undefined
export default defineCommand({
  id: 'init',
  run(args, options, command) {
    console.log('xxx');
  },
});
```
