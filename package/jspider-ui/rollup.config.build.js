import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import CONFIG from './package.json';
import vue from 'rollup-plugin-vue';
export default [
    {
        input: 'src/index.js', // 通用版本打包
        plugins: [
            del({ targets: 'dist/*' }),
            vue({
                // 把单文件组件中的样式，插入到html中的style标签
                css: true,
                // 把组件转换成 render 函数
                compileTemplate: true,
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
        ],
        output: {
            // 打包出口
            file: './dist/jspider-user-interface.js',
            format: 'es',
        },
    },
];
