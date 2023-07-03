module.exports = {
    'env': {
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
      ],
    'parserOptions': {
        'project': 'tsconfig.json',
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'warnOnUnsupportedTypeScriptVersion': false
    },
    'rules': {
        'quotes': ['error', 'single'],
        'semi': 'error',
        'prefer-const': 'error',
        '@typescript-eslint/no-eq-null': true,
        '@typescript-eslint/no-non-null-assertion': true,
        '@typescript-eslint/unified-signatures': false,
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-undefined': true
    }
};
