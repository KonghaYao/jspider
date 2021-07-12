// Spider 是 JSpider 的爬虫流程工具，主要目的是爬取文件，负责如何爬取文件与数据。
import { EventHub } from './Radio/EventHub.js';
import { staticEvent } from './staticEvent';
export class JSpider {
    constructor(config = {}) {
        this.#config = config;
        this.#Hub = new EventHub(staticEvent, this); // 注册静态事件
    }
    crawl() {}
    play() {}
    stop() {}
}
