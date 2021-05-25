module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/eslint-recommended'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json']
      },
      typescript: {}
    },
    'import/extensions': ['.js', '.ts', '.mjs']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-use-before-define': 'off',
        'import/no-duplicates': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        'no-unused-vars': 'off'
      }
    }
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
