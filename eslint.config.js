export default [{
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint', 'airbnb', 'airbnb-typescript'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/warnings'
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslin.config.js'],
  rules: {
    semi: "error",
    "quotes": ["error", "double"]
  }
}];