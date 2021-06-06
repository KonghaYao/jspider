import resolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "rollup-plugin-commonjs"; // 将非ES6语法的包转为ES6可用
// import { terser } from "rollup-plugin-terser";
// import typescript from "rollup-plugin-typescript2";
import license from "rollup-plugin-license";

import json from "@rollup/plugin-json";
import multiInput from "rollup-plugin-multi-input";
export default {
    input: ["src/**/*.js"], // 打包入口
    output: {
        // 打包出口
        dir: "./dist/",
        format: "es",
    },
    plugins: [
        multiInput({ relative: "esm/" }),
        // 打包插件
        json(),
        license({
            banner: {
                commentStyle: "regular", // The default
                content: {
                    file: "./LICENSE",
                },
            },
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }), // 查找和打包node_modules中的第三方模块

        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        // typescript({ outDir: "./dist/ts", tsconfig: "./tsconfig.json" }), // 解析TypeScript
    ],
};
