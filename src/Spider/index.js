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

import ControlPanel from '../ControlPanel/index.js';
import { ConsoleView } from '../View/ConsoleView.js';
// Spider 是一个 View
export class Spider {
    constructor({ logEvery = false } = {}) {
        this.config = {
            logEvery,
        };
        this.views = new ConsoleView(this.config);
    }
    crawl(...args) {
        ControlPanel.createFlow(args.flat());
        return this;
    }
    pipeline(...plugins) {
        ControlPanel.pipeline(...plugins);
        return this;
    }
    start() {
        ControlPanel.startFlow();
        return this;
    }
    stop() {
        ControlPanel.stopFlow();
        return this;
    }
}
