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
        'prefer-const': 'error'
    }
};
