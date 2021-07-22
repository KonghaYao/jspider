import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
export default {
    input: './router.js', // 打包入口
    output: [
        {
            // 打包出口
            file: './dist/index.js',
            format: 'es',
        },
    ],
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        livereload({ watch: 'dist' }),
        serve({
            openPage: '/index.html',
            open: 'true',
            port: '8888',
        }),
    ],
};
