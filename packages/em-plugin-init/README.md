# em-init

- [] 拉取模版项目

- [x] travis

1. 输出 .travis.yml 配置文件
2. 使用 github 账号登陆 travis-ci 并授权
   > https://travis-ci.com/
3. 同步 github 仓库 点击绿色的 `Sync Account`
   > https://travis-ci.com/account/repositories
4. 到 dashboard 选中需要 构建的项目进行一次 `trigger a build`
   > https://travis-ci.com/dashboard

- [x] eslint

1. eslint 做代码质量检查
2. prettier 做格式化检查

- [x] prettier

1. 通过 .prettierrc 文件自定义行为

- [x] git

1. 自动初始化仓库

- [x] typescript

1. 自动安装 typescript
2. 自动初始化 tsconfig.js

- [x] commitlint

1. 使用 husky(`pre-commit hook`) 和 lint-stage 进行代码规范检查

2. 使用 husky(`commit-msg hook`) 校验本次的提交的 message 是否符合规范

- [x] monorepo

1. 使用 `pnpm` 管理多包仓库

2. 使用 `yarn workspaces 和 lerna` 管理多包仓库
