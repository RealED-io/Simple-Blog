import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/ts': stylistic,
      '@stylistic/js': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
        '@stylistic/ts/indent': ['error', 2],
        '@stylistic/js/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
        '@stylistic/js/jsx-first-prop-new-line': ['error', 'multiline'],
        '@stylistic/js/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        "comma-dangle": ['error', 'always-multiline'],
        '@stylistic/ts/quotes': ['error', 'single'],
        '@stylistic/ts/semi': ['error', 'always'],
        eqeqeq: 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
