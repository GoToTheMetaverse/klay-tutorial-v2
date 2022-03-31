module.exports = {
  env: {
    node: true, // process is not defined 문제 해결
    browser: true, // process is not defined 문제 해결
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    // Parsing error: Invalid ecmaVersion at ... 에러 발생
    // ecmaVersion: 13, // 너무 높은가?
    // ecmaVersion: 6,
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off', // console.log 사용할꺼임

    // Strings must use singlequote
    // https://blog.uniqbuild.co.kr/?p=559
    // quotes: [2, 'double', { avoidEscape: false }],
    // semi: [2, 'always'],
  },

  // {
  //   "parser": "babel-eslint",
  //   "parserOptions": {
  //     "sourceType": "module",
  //     "allowImportExportEverywhere": true
  //   }
  // }
}
