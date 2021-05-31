import resolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "rollup-plugin-commonjs"; // 将非ES6语法的包转为ES6可用
// import typescript from "rollup-plugin-typescript";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";

export default ["./src/fakeServer/fakeServer.js", "./src/JSpider.js"].map((input) => ({
    input, // 打包入口
    output: {
        // 打包出口
        dir: "./dist/",
        format: "es", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    },
    plugins: [
        // 打包插件
        json(),
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        // typescript(), // 解析TypeScript
        livereload(),
    ],
}));
