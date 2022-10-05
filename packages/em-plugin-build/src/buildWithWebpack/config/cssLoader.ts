import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

export function getCssLoader(lang: 'scss' | 'less' | 'css') {
  const styleLoader = {
    loader: MiniCSSExtractPlugin.loader,
  };

  const cssLoader = {
    loader: 'css-loader',
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
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      postcssOptions: {
        config: true,
      },
    },
  };
  const lessLoader = {
    loader: 'less-loader',
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
