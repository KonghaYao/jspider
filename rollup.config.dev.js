import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import defaultPlugin from './script/rollup.plugins.js';
export default {
    input: 'index.js', // 打包入口
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
        ...defaultPlugin,
        livereload({ watch: 'dist' }),
        serve({
            openPage: '/test.html',
            open: 'true',
            port: '8888',
        }),
    ],
};
