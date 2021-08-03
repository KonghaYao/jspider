import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import CONFIG from './package.json';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
export default {
    input: 'src/index.js', // 打包入口
    output:
        {
            // 打包出口
            file: './dist/jspider-user-interface.js',
            format: 'es',
        },
    plugins: [
        vue({
            // 把单文件组件中的样式，插入到html中的style标签
            css: true,
            // 把组件转换成 render 函数
            compileTemplate: true
          }),
          postcss({
            // 把 css 插入到 style 中
            // inject: true,
            // 把 css 放到和js同一目录
            extract: true
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
            open: 'true',
            port: '8888',
        }),
    ],
};
