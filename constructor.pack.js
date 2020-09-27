// 用于直接将 jszip 等额外的库直接合并到工具中。
// JSpider.init.js 是 webpack 打包之后的文件，然后经过这个文件后就生成一个 JSpider.js

const fs = require("fs");
async function main() {
    let extend = await new Promise((resolve, reject) => {
        fs.readdir("./src", (err, files) => {
            resolve(files.map((i) => "./src/" + i));
        });
    });
    extend.push("./dist/JSpider.webpack.js");
    let results = await Promise.all(extend.map((path) => read(path)));

    let message = await write(results.join("\n\n\n"));
    console.log(message);
}

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
}

function write(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/JSpider.es5.js", data, (err, data) => {
            if (err) throw err;
            resolve("写入完成");
        });
    });
}

main();
