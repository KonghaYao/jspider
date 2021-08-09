import license from 'rollup-plugin-license';
import del from 'rollup-plugin-delete';
import defaultPlugin from './script/rollup.plugins.js';
const plugins = [
    del({ targets: 'dist/*' }),
    ...defaultPlugin,
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
        input: 'index.js', // 通用版本打包
        plugins,
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
];
