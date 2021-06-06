# lerna

## 开始

1. 使用lerna初始化项目和发布项目

```shell
lerna init 
```

2. 使用 yarn workspace管理依赖和安装依赖

> yarn 会自动创建包之间的软链接

```shell
# 安装依赖
yarn 
# 添加依赖到指定包
yarn workspace [packageName] add  [npmPackageName]
```

## 问题记录

**lerna Command failed with exit code 128: git rev-parse HEAD**

> https://github.com/lerna/lerna/issues/763: 提交本地仓库的代码再import

```shell
# cmd
lerna import [path]
# ex1
lerna import /Users/evanzyli/Desktop/owner/em-cli  
```

**lerna ERR! E402 You must sign up for private packages**

> https://www.yuque.com/iyum9i/uur0qi/iyg4fz: 作用域包需要 "access": "public"

**发布scope包**

1.npm 官网新建em-cli.

2. 更改自己的包名称 package.json： name: "@em-cli/xxxxxxx"

3. 先登录，再发布 npm login. 用户名密码如果忘了，去官网查。

4. 添加 --access public 到pkg.json中

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

**发布含有bin的npm包的时请确保bin目录在发布的文件中**

> 通过 package.json 的files字段指定

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
