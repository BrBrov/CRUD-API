module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        'warnOnUnsupportedTypeScriptVersion': false
    },
    "rules": {
        'quotes': ['error', 'single'],
        'semi': 'error',
        'prefer-const': 'error'
    }
}
