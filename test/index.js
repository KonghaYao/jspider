import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
const { Request, Download, ExcelHelper, Dexie } = JSpider.plugins;
const { getData, setStore } = Dexie;

let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});
async function main() {
    await JSpider.initPlugins(ExcelHelper, Dexie);

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
        setStore()
        // JSpider.rxjs.map((res) => {
        //     console.log(res);
        // })

        // Download()
    );

    window.JSpider = JSpider;
    window.spider = spider;
    let message = await getData();
    console.log(message);
    if (message && message.length) {
        spider.apply(message);
    } else {
        spider.apply(urls);
    }
}

main();
