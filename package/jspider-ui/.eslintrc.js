module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        commonjs: true,
    },
    plugins: ['prettier'],
    extends: ['eslint:recommended', 'prettier', 'google'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        requireConfigFile: false,
    },
    rules: {
        'prettier/prettier': ['error'],
        'no-console': 0,
        'no-prototype-builtins': 0, // 不调用 object 本身的属性
        'no-useless-escape': 0, // 正则表达式转义的时候的一个错误
        'require-jsdoc': 0,
        'new-cap': 0, // 函数首字母不能大写
        indent: 0, // prettier 已经处理好了
        'object-curly-spacing': 0, // prettier 自动格式化这个部分
        'max-len': ['error', 120],
        'quote-props': ['error', 'as-needed'],
        'operator-linebreak': 0,
        'no-unused-vars': 1,
        'space-before-function-paren': 0, // 交由 prettier 管理
    },
};
