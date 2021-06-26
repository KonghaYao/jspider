import { JSpider } from "./core/index.js";
import { Request, Download } from "./plugins/index.js";
export const simpleCrawl = function (urls) {
    const spider = new JSpider(Request(), Download());
    spider.apply(urls);
};
