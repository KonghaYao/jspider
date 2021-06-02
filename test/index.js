import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
const { Request, Download } = JSpider.plugins;

let urls = [...Array(1).keys()].map((i, index) => {
    return { url: "/bilibili/search", name: index + ".json" };
});
const spider = new JSpider(Request());
window.JSpider = JSpider;
window.spider = spider;
spider.apply(urls);
