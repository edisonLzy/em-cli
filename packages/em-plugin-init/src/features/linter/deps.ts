export const deps = [
  '@babel/eslint-parser',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  // 用来覆盖 ESLint 本身的规则配置
  'eslint-config-prettier',
  // 用于让 Prettier 来接管eslint --fix即修复代码的能力
  'eslint-plugin-prettier',
  'prettier',
  'eslint',
  // stylelint相关
  'stylelint',
  'stylelint-prettier',
  'stylelint-config-prettier',
  'stylelint-config-recess-order',
  'stylelint-config-standard',
  'stylelint-config-standard-scss',
];
