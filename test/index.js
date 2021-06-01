import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
const { Request, quickFunc } = JSpider.plugins;

let urls = [...Array(10).keys()].map((i) => {
    return "/bilibili/search";
});
const spider = new JSpider(
    Request(),
    quickFunc((data) => {
        console.log(data);
        return data;
    })
);
window.spider = spider;
spider.apply(urls);
