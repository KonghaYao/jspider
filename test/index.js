import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
const { Request, Download, ExcelHelper } = JSpider.plugins;

let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});
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
    JSpider.rxjs.map((res) => {
        console.log(res);
    })

    // Download()
);

window.JSpider = JSpider;
window.spider = spider;
spider.apply(urls);
