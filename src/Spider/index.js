/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * @Author: KonghaYao
 * @Date: 2021-07-13 15:33:08
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-07-19 16:34:32
 */
// Spider 是 JSpider 的爬虫流程工具，主要目的是爬取文件，负责如何爬取文件与数据。

import { Pipeline } from '../Pipeline/index';
import ControlPanel from '../ControlPanel/index.js';
import { TaskUpdate } from '../Mirror/Mirror.js';
class View {
    constructor() {}
    tasks = [];
    #uuidArray = [];
    _update(data) {
        const index = this.#uuidArray.indexOf(data.uuid);
        if (index === -1) {
            this.#uuidArray.push(data.uuid);
            this.tasks.push(data);
        } else {
            // 并不是直接赋值，而是通过数组的 splice 方式进行数组的更新，这样可以方便 Vue 渲染
            this.tasks.splice(index, 1, data);
        }
    }
}
// Spider 是 Console 的数据放送
export class Spider {
    constructor({ logEvery = false } = {}) {
        this.config = {
            logEvery,
        };
        if (logEvery) {
            TaskUpdate.subscribe((data) => {
                this.views._update(data);
            });
        }
    }
    views = new View();
    crawl(...args) {
        ControlPanel.createFlow(args.flat());
        return this;
    }
    pipeline(...plugins) {
        ControlPanel.pipeline = new Pipeline(plugins);
    }
    start() {
        ControlPanel.startFlow();
    }
    stop() {
        ControlPanel.stopFlow();
    }
}
