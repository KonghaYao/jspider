/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:05:51
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:05:51
 */
import { JSpider } from "./core/index.js";
import { Request, Download } from "./plugins/index.js";

export function simpleCrawl(urls) {
    const spider = new JSpider(Request(), Download());
    spider.apply(urls);
}
