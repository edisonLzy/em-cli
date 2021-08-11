import { Configuration } from 'webpack';
import { resolveCwdPath } from '../../utils';
import { getCssLoader } from './cssLoader';
import { getBabelLoader } from './babelLoader';
export default function createBaseConfig(cwd: string): Configuration {
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@': resolveCwdPath(cwd)('src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { ...getBabelLoader('js') },
          },
        },
        {
          test: /\.css$/,
          use: getCssLoader('css'),
        },
        {
          test: /\.less$/,
          use: getCssLoader('less'),
        },
      ],
    },
  };
}
