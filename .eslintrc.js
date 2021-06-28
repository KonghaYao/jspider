module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    plugins: ["prettier"],
    extends: ["eslint:recommended", "google", "prettier"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        "prettier/prettier": ["error"],
        "no-console": "off",
        "no-prototype-builtins": "off",
        "no-useless-escape": 0,
        "no-empty": 0,
        "require-jsdoc": 0,
        "new-cap": 0
    }
};
