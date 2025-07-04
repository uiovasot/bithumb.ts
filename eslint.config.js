import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
        parserOptions: {
            project: './tsconfig.json',
        },
    },
    rules: {},
});
