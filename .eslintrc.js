// https://eslint.org/docs/rules/
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard', 'plugin:storybook/recommended'],
  rules: {
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
