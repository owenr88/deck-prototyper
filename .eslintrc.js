module.exports = {
  extends: 'react-app',
  plugins: ['sort-imports-es6-autofix'],
  rules: {
    //   This will sort imports... turn on when you we are ready
    // "sort-imports-es6-autofix/sort-imports-es6": [2, {
    //     "ignoreCase": true,
    //     "ignoreMemberSort": false,
    //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    //   }],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 0,
    camelcase: 'off',
    'consistent-return': 0,
    'global-require': 0,
    'no-tabs': 0,
    'no-nested-ternary': 0,
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],

    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    // 'react/no-unescaped-entities': 0,
    'react/no-unescaped-entities': ['warn'],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    // 'react/jsx-closing-bracket-location': 1,
    'react/jsx-pascal-case': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/no-danger': 0,
    'react/jsx-filename-extension': 0,
  },
};
