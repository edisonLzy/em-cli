import path from 'path';

export function resolveConfigFile(workDir: string) {
  return ['webpack.config.ts', 'webpack.config.js'].map((file) =>
    path.resolve(workDir, file)
  );
}
