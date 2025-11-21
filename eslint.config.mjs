// eslint.config.mjs
// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // 0) ignore ตัวเอง
  { ignores: ['eslint.config.mjs', 'dist/**'] },

  // 1) base JS
  eslint.configs.recommended,

  // 2) โซน SERVER (NestJS + Mongoose)
  {
    files: ['server/src/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parserOptions: {
        // ใช้ tsconfig เฉพาะฝั่ง server
        project: ['./server/tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // เปิดกฎ TS ที่อาศัย type
    extends: [...tseslint.configs.recommendedTypeChecked, eslintPluginPrettierRecommended],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // ถ้ายังฟ้องเฉพาะ decorator คอมเมนต์บรรทัดล่างนี้ออกชั่วคราว
      // '@typescript-eslint/no-unsafe-call': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  // 3) โซน WEB (Next.js)
  {
    files: ['web/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        project: ['./web/tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [...tseslint.configs.recommendedTypeChecked, eslintPluginPrettierRecommended],
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
