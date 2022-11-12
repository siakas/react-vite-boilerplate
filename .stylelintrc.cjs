module.exports = {
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-sass-guidelines',
  ],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    // アルファベット順のソートを無効化（stylelint-config-recess-order のソートを優先）
    'order/properties-alphabetical-order': null,

    // 不明な @rule に対するチェックのルール
    // Tailwind CSS で利用する @rule を許可
    'scss/at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['tailwind', 'layer', 'apply'] },
    ],

    // 不明な関数に対するチェックのルール
    // Tailwind CSS で利用する関数を許可
    'function-no-unknown': [true, { ignoreFunctions: ['theme', 'screen'] }],
  },
}
