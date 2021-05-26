# lerna 

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

2.更改自己的包名称 package.json： name: "@em-cli/xxxxxxx"

3.先登录，再发布 npm login. 用户名密码如果忘了，去官网查。

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
## 常用命令

```shell
lerna publish from-package
```
