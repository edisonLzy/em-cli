import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

export function getCssLoader(lang: 'scss' | 'less' | 'css') {
  const styleLoader = {
    loader: require.resolve(MiniCSSExtractPlugin.loader),
  };

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      // 处理css文件只需要处理 postcss-loader处理
      importLoaders: lang === 'css' ? 1 : 2,
      sourceMap: true,
      modules: {
        localIdentName: '[hash:base64]',
        exportLocalsConvention: 'camelCaseOnly',
        auto: true,
      },
    },
  };
  const postcssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
      sourceMap: true,
      postcssOptions: {
        config: true,
      },
    },
  };
  const lessLoader = {
    loader: require.resolve('less-loader'),
    options: {
      sourceMap: true,
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  };
  return lang === 'less'
    ? [styleLoader, cssLoader, postcssLoader, lessLoader]
    : [styleLoader, cssLoader, postcssLoader];
}
