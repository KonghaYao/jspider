import resolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "rollup-plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import typescript from "rollup-plugin-typescript";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
export default {
    input: "./src/index.js", // 打包入口
    output: {
        // 打包出口
        file: "./dist/bundle.js", // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
        format: "es", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    },
    plugins: [
        // 打包插件
        json(),
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        typescript(), // 解析TypeScript
        livereload(),
        serve({
            open: true,
            port: 8888,
            contentBase: "./",
        }),
    ],
};
