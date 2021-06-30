import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
const plugins = [
    json(),
    resolve({
        browser: true,
    }),
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    terser(),
    license({
        banner: {
            content: {
                file: './LICENSE',
            },
        },
    }),
];
export default [
    {
        input: 'src/JSpider.js', // 通用版本打包
        plugins: [del({ targets: 'dist/*' }), ...plugins],
        output: [
            {
                // 打包出口
                file: './dist/JSpider.min.js',
                format: 'iife',
                name: 'JSpider',
            },
            {
                // 打包出口
                file: './dist/JSpider.umd.min.js',
                format: 'umd',
                name: 'JSpider',
            },
            {
                // 打包出口
                file: './dist/JSpider.cjs.min.js',
                format: 'cjs',
                exports: 'default',
            },
            {
                // 打包出口
                file: './dist/JSpider.esm.min.js',
                format: 'es',
            },
        ],
    },
    {
        input: 'src/JSpider.esm.js', // 这是一个可以进行 TreeShake 的版本
        plugins,
        output: [
            {
                // 打包出口
                file: './dist/JSpider.js',
                format: 'es',
            },
        ],
    },
];
