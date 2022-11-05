module.exports = {
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-sass-guidelines',
  ],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    // アルファベット順のソートを無効化（stylelint-config-recess-order のソートを優先）
    'order/properties-alphabetical-order': null,
  },
}
