import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import CONFIG from './package.json';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import alias from '@rollup/plugin-alias';
export default {
    input: 'src/index.js', // 打包入口
    output: [
        {
            // 打包出口
            file: './dist/JSpider.esm.min.js',
            format: 'es',
        },
        {
            // 打包出口
            file: './dist/JSpider.min.js',
            format: 'iife',
            name: 'JSpider',
        },
    ],
    plugins: [
        alias({
            entries: {
                '@tools': './tools',
                '@src': './src',
                '@plugins': './plugins',
                '@FakeServer': './FakeServer',
            },
        }),
        replace({
            preventAssignment: true,
            values: { __version__: JSON.stringify(CONFIG.version), __buildDate__: new Date().getTime() },
        }),
        json(),
        resolve({
            browser: true,
        }),
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        livereload({ watch: 'dist' }),
        serve({
            openPage: '/test.html',
            open: 'true',
            port: '8888',
        }),
    ],
};
