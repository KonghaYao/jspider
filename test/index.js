import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
const { Request, Download, ExcelHelper, Store } = JSpider.plugins;
const { getStore, setStore } = Store;

let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});
async function main() {
    await JSpider.initPlugins(ExcelHelper, Store);

    const spider = new JSpider(
        Request(),
        ExcelHelper(
            function formatter(data) {
                return data;
            },
            {
                XLSXOptions: {
                    bookType: "csv",
                },
            }
        ),
        setStore(),
        JSpider.rxjs.map((res) => {
            console.log(res);
        })

        // Download()
    );

    window.JSpider = JSpider;
    window.spider = spider;
    let message = await getStore();
    console.log(message);
    spider.apply(message.length ? message : urls);
}

main();
