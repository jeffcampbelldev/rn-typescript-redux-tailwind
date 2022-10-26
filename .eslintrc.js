module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
