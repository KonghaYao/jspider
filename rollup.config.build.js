import resolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "rollup-plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import multiInput from "rollup-plugin-multi-input";
import { terser } from "rollup-plugin-terser";
import license from "rollup-plugin-license";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";

export default [
    {
        input: ["src/**/*.js"], // 打包入口
        output: {
            // 打包出口
            dir: "./dist/esm",
            format: "es",
        },
        plugins: [
            del({ targets: "dist/*" }),
            multiInput(),
            json(),
            resolve({
                browser: true,
            }),
            commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
            terser(),
            license({
                banner: {
                    content: {
                        file: "./LICENSE",
                    },
                },
            }),
        ],
    },
    {
        input: "src/JSpider.js", // 打包入口
        plugins: [
            json(),
            resolve({
                browser: true,
            }),
            commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
            terser(),
            license({
                banner: {
                    content: {
                        file: "./LICENSE",
                    },
                },
            }),
        ],
        output: [
            {
                // 打包出口
                dir: "./dist/cjs",
                format: "cjs",
                exports: "named",
            },
            {
                // 打包出口
                dir: "./dist/iife",
                format: "iife",
                name: "JSpider",
                exports: "named",
            },
        ],
    },
];
