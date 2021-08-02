const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
// ! 这个文件并非是 webpack 的打包文件，只是因为 madge 生成代码依赖图的时候需要进行 alias 的声明

module.exports = {
    entry: '../main.js',
    output: {
        filename: 'bundle.js',
        path: './dist',
    },
    resolve: {
        // 设置别名
        alias: {
            '@tools': resolve('../tools'),
            '@src': resolve('../src'),
            '@plugins': resolve('../plugins'),
            '@FakeServer': resolve('../FakeServer'),
        },
    },
};
