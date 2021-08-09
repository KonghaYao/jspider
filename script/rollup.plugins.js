import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import CONFIG from '../package.json';
import alias from '@rollup/plugin-alias';

export default [
    alias({
        entries: {
            '@tools': './package/tools',
            '@src': './src',
            '@plugins': './package/plugins',
            '@FakeServer': './package/FakeServer',
        },
    }),
    replace({
        preventAssignment: true,
        values: {
            __version__: JSON.stringify(CONFIG.version),
            __buildDate__: new Date().getTime(),
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
    }),
    json(),
    resolve({
        jsnext: true,
        browser: true,
    }),
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
];
