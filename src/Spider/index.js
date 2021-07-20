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
import { EventHub } from '../utils/EventHub.js';
import { staticEvent } from './staticEvent';
import { Pipeline } from '../Pipeline/index';
import ControlPanel from '../ControlPanel/index.js';

// TODO 未完成接口的接入
export class Spider {
    constructor(config = {}) {
        this.config = config;
        this.$EventHub = new EventHub(staticEvent, this); // 注册静态事件
    }
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
