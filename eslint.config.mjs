import { fixupPluginRules } from '@eslint/compat';

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

import react from 'eslint-plugin-react';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

react.configs.recommended.plugins = { react };
react.configs.recommended.languageOptions = {
  parserOptions: react.configs.recommended.parserOptions,
};
delete react.configs.recommended.parserOptions;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['**/node_modules/', '**/dist/', '**/build/'] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.recommended,
  ...compat.extends('eslint-config-airbnb'),
  ...compat.extends('eslint-config-prettier'),
  {
    plugins: { prettier: fixupPluginRules(prettierPlugin), react },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint에 통합
      indent: ['error', 2], // 2칸 들여쓰기
      quotes: ['error', 'single'], // 단일 따옴표 사용
      semi: ['error', 'always'], // 세미콜론 항상 사용
      'no-unused-vars': ['warn'], // 사용되지 않는 변수 경고
      complexity: ['warn', { max: 10 }], // 함수 복잡성 제한
      'max-depth': ['warn', 4], // 코드 중첩 수준 제한
      'comma-dangle': ['error', 'always-multiline'], // 마지막 쉼표 사용
      'no-console': 'warn', // console.log 사용 경고
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
