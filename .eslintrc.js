const prettierConfig = require('./prettier.config')

const __DEV__ = process.env.NODE_ENV !== 'production'
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    // ts support
    'plugin:import/typescript',
    // the last extension
    'plugin:prettier/recommended',
  ],
  rules: {
    // prettier
    'prettier/prettier': ['warn', prettierConfig],
    // js
    // 'import/default': 'off',
    'no-shadow': 'error',
    'no-unused-vars': 'warn',
    'no-debugger': __DEV__ ? 'off' : 'warn',
    'no-console': __DEV__ ? 'off' : 'warn',
    'require-yield': 'warn',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    // comments
    'eslint-comments/disable-enable-pair': [
      'warn',
      {
        allowWholeFile: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.tsx', '.ts', '.js', '.jsx', '.json'],
    'import/resolver': {
      typescript: {
        project: ['./jsconfig.json', './tsconfig.json'],
      },
    },
  },
  // ts 规则单独覆盖
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        // close js rules
        'no-shadow': 'off',
        // ts
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        // no any
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        // ! operator
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
}
