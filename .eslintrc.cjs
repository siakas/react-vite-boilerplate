module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    // 以下二行を有効化すると module.exports が記述エラーになるため、いったんコメントアウト
    // tsconfigRootDir: '.',
    // project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jsx-a11y', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 任意の構文の間に空行を入れるかどうかの定義
    // ここでは return 文の前に常に空行を入れるよう設定
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],

    // オブジェクトの型定義にインターフェースまたは型エイリアスのどちらかを強制するルール
    // eslint-config-standard-with-typescript がインターフェースを強制しているのを無効化
    '@typescript-eslint/consistent-type-definitions': 'off',

    // 関数の戻り値に必ず型定義を書かなければいけないルール
    // eslint-config-standard-with-typescript が全面採用しているが厳しすぎるため、
    // その適用がエクスポートされる関数に限られる @typescript-eslint/explicit-module-boundary-types に入れ替え
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['error'],

    // Promise の誤用を防ぐためのルール
    // 何も返さない async 関数のコールに明示的に void キーワードをつけることを強制され、
    // かつ、コンポーネントのイベント属性に async 関数を渡す際に、
    // (e) => { void handleSubmit(e) } のような煩雑な記述を強いられるのを部分的に無効化
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    // 使用していない変数の定義を許可しないルール
    // ここでは変数および引数の名前の頭に `_` をつけた時のみ許容するよう設定
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // Boolean 値が期待される記述で、Boolean 型以外の使用を許可しないルール
    // ここではオブジェクト、関数、null、undefined の場合には許容するよう設定
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowNullableObject: true,
      },
    ],

    // トリプルスラッシュ・ディレクティブの使用を許可するかどうかを定義するルール
    // ここでは eslint-config-standard-with-typescript が一律禁止にしているのを、type 属性に限り許可するように設定
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        types: 'always',
      },
    ],

    // インポートの際のファイル拡張子を記述するかを定義するルール
    // ここでは npm パッケージ以外のファイルについて、`.js`、`.jsx`、`.ts`、`.tsx` のみ拡張子を省略し、
    // それ以外のファイルは拡張子を記述させるように設定
    'import/extensions': [
      'error',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      },
    ],

    // 最後のインポート文のあとは空行を入れるよう設定
    'import/newline-after-import': 'error',

    // モジュールインポートの順番をカスタマイズできるルール
    // react および react-dom モジュールを最初に、
    // 非相対パスで記述した内部モジュールのコンポーネントを相対パスモジュールの直前に、
    // CSS Modules ファイルのインポートを最後にするよう設定
    // import from `xxx` 形式の記述は eslint-plugin-import が認識できないため、通常の CSS ファイルのインポート文はソート不可
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        pathGroups: [
          // react 関連のモジュールを外部モジュールより前に配置する
          {
            pattern: '{react,react-dom/**,react-router-dom,next,next/**}',
            group: 'builtin',
            position: 'before',
          },
          // 非相対パスで記述した内部モジュールのコンポーネントを相対パスモジュールの直前に配置
          {
            pattern: '{[A-Z]*,**/[A-Z]*}',
            group: 'internal',
            position: 'after',
          },
          // CSS Modules ファイルを一番最後に配置
          {
            pattern: './**.module.{scss,css}',
            group: 'index',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // displayName コンポーネントのプロパティで、デバッグメッセージでコンポーネントを明示するのに使用
    // これがなくてもほとんどの場合はコンポーネントを特定できるため無効化
    'react/display-name': 'off',

    // React 17 以降で eslint-plugin-react を使用している場合のための設定
    // 下記を無効化することで不要なエラーを回避
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Boolean 変数の受け渡しには JSX の省略形を使用する
    'react/jsx-boolean-value': 'error',

    // 文字列の属性値に波括弧は不要
    'react/jsx-curly-brace-presence': 'error',

    // 子要素のないコンポーネントは自己終了タグを使う
    // HTML タグは除外している
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        // コンポーネントの props に型チェックをおこなうための propTypes プロパティの定義を強制するルール
        // TypeScript の場合は不要なので、ファイル拡張子が `.tsx` の場合に無効化するよう設定を上書き
        'react/prop-types': 'off',
      },
    },
  ],
}
