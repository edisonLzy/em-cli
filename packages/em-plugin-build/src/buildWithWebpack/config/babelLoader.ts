export function getBabelLoader(lang: 'js' | 'ts') {
  const presets = [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];
  const plugins: any = [];
  if (lang === 'ts') {
    presets.push('@babel/preset-typescript');
  }
  return {
    presets,
    plugins,
  };
}
