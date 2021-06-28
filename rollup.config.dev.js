import resolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "rollup-plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import json from "@rollup/plugin-json";

export default {
    input: "src/JSpider.js", // 打包入口
    output: [
        {
            // 打包出口
            file: "./dist/JSpider.esm.min.js",
            format: "es"
        },
        {
            // 打包出口
            file: "./dist/JSpider.min.js",
            format: "iife",
            name: "JSpider"
        }
    ],
    plugins: [
        json(),
        resolve({
            browser: true
        }),
        commonjs() // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    ]
};
