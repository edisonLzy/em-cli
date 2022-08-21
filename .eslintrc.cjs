const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
      },
      typescript: {},
    },
    'import/extensions': ['.js', '.ts', '.mjs'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-use-before-define': 'off',
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
    // {
    //   files: ['packages/**/src/**/*'],
    //   rules: {
    //     'no-restricted-globals': [
    //       'error',
    //       'require',
    //       '__dirname',
    //       '__filename',
    //     ],
    //   },
    // },
  ],
});
