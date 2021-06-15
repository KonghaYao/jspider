// 测试 基础 Plugins 的代码
import JSpider from "../dist/esm/JSpider.js";
const {
    Request, // 请求库
    Download, // 下载库
    ExcelHelper, // 转换数据为表格数据的插件
    Dexie, // indexDB 暂存数据的插件
} = JSpider.plugins;
const { createPlugin, initPlugins } = JSpider;
const { getData, setStore } = Dexie;

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
        createPlugin((task) => {
            console.log(task);
            return task;
        }),
        setStore()
        // Download()
    );
    let message = await getData();
    console.log("从 indexDB 中取出", message);
    spider.apply(message && message.length ? [...message, "/fake/excel"] : urls);
}

export { main };
