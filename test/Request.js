// 测试 基础 Plugins 的代码
import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
const {
    Request, // 请求库
    Download, // 下载库
    ExcelHelper, // 转换数据为表格数据的插件
    Dexie: { getData, setStore }, // indexDB 暂存数据的插件
} = JSpider.plugins;
const { createPlugin, initPlugins } = JSpider;

// 您的爬取路径代码
let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});

async function main() {
    // 初始化需要初始化的插件
    await initPlugins(ExcelHelper, Dexie);
    const spider = new JSpider(
        Request(),
        ExcelHelper(
            function formatter(data) {
                // 将数据处理成 {sheetName}
                return data;
            },
            {
                XLSXOptions: {
                    bookType: "csv", // 可以指定为 csv 或者 xlsx
                },
            }
        ),
        setStore(),
        createPlugin((task) => {
            console.log(task);
            return task;
        })
        // Download()
    );
    let message = await getData();
    console.log("从 indexDB 中取出", message);
    spider.apply(message && message.length ? message : urls);
}

export { main };
