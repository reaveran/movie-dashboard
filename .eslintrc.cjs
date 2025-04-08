module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // prettier must be the lowest
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '**/*.d.ts', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    '@typescript-eslint',
    'simple-import-sort',
    'tss-unused-classes',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 0,
    'react-hooks/exhaustive-deps': 1,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'promise/always-return': 'off',
    'tss-unused-classes/unused-classes': 'warn',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // External packages
          ['^react', '^@?\\w'],
          // Internal modules as the folder structure on jira
          [
            '^@/components',
            '^@/modules',
            '^@/config',
            '^@/pages',
            '^@/apis',
            '^@/assets',
            '^@/utils',
            '^@/navigation',
            '^@/styles',
          ],
          // Relative imports
          ['^\\.'],
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
};
