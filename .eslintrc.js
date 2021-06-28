module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    plugins: ["prettier"],
    extends: ["eslint:recommended", "prettier", "google"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        "prettier/prettier": ["error"],
        "no-console": 0,
        "no-prototype-builtins": 0, // 不调用 object 本身的属性
        "no-useless-escape": 0, // 正则表达式转义的时候的一个错误
        "require-jsdoc": 0,
        "new-cap": 0 // 函数首字母不能大写
    }
};
