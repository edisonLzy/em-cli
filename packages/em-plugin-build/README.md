# `@em-cli/em-plugin-build`

- [] js 库打包 (rollup)
- [] spa 项目 打包 (webpack)
- [] 组件库打包 (react,vue)
- [] 单文件打包 (.tsx,.vue)

## Usage

```
const emPluginBuild = require('@em-cli/em-plugin-build');

// TODO: DEMONSTRATE API
```

## FAQ

1. Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)

```ts
// babel配置缺少 .tsx
        babel({
          extensions: ['.tsx', '.ts', '.jsx', '.js'],
          presets: [
            [
              require.resolve('@babel/preset-env'),
              {
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false,
              },
            ],
            require.resolve('@babel/preset-typescript'),
            [require.resolve('@babel/preset-react')],
          ],
        }),
```

2. react/jsx-runtime: 被打入结果中的问题

```ts
    {
      // 在 external中使用正则 匹配 react/jsx-runtime
       external: [/react/, 'classnames'],
    }
```

3. 'jsx' is not exported by node_modules/react/jsx-runtime.js

```ts
// 使用 @rollup/plugin-commonjs 转换 commonjs 成 esm
import commonjs from '@rollup/plugin-commonjs';
```

4. 类比 webpack.resolve.extension 扩展名: Could not resolve './C' from src/index.tsx

```ts
      nodeResolve({
          extensions: ['.tsx', '.ts', '.jsx', '.js'],
        }),
```
