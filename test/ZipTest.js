// 测试 基础 Plugins 的代码
import JSpider from "../dist/JSpider.esm.min.js";
const { Request, Download, ZipFile, ExcelHelper } = JSpider.plugins;
const { Plugin } = JSpider;

// 您的爬取路径代码
let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});

async function main() {
    const spider = new JSpider(
        Request(),
        // ExcelHelper(
        //     {
        //         XLSXOptions: {
        //             bookType: "csv", // 可以指定为 csv 或者 xlsx
        //         },
        //     }
        // )
        ZipFile({
            chunk: 2,
        }),
        Plugin((task) => {
            console.log(task);
            return task;
        })

        // Download()
    );
    spider.apply(urls);
}

export { main as ZipTest };
