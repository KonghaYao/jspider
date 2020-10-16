// 用于直接将 jszip 等额外的库直接合并到工具中。
// JSpider.webpack.js 是 webpack 打包之后的文件，然后经过这个文件后就生成一个 JSpider.js

// 下面的根目录是 JSpider.js 所在的文件夹

const fs = require("fs");
async function main() {
    console.log("js 脚本启动");
    console.log("  读取文本夹下文件");
    let extend = await readDIR("./lib/");
    extend.unshift("./dist/JSpider.webpack.js");

    let results = await Promise.all(extend.map((path) => read(path)));

    let message = await write(results.join("\n\n\n"));
    console.log(message);
}

function readDIR(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            resolve(files.map((i) => path + i));
        });
    });
}

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            console.log("    读取文件：  " + path);
            if (err) throw path;
            resolve(data);
        });
    });
}

function write(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/JSpider.es5.js", data, (err, data) => {
            console.log("  写入  ./dist/JSpider.es5.js ");
            if (err) throw err;

            resolve("写入完成");
        });
    });
}

main();
