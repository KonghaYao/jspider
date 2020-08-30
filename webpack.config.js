module.exports = {
    mode: "development", //production默认会压缩代码，development则不会。
    entry: __dirname + "/JSpider-all.js", //入口文件，多个入口可以对象kv方式传入
    output: {
        path: __dirname + "/build",
        filename: "JSpider.js",
    },
};
