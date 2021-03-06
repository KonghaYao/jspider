/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:05:42
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 16:25:37
 */
import { JSpider, Plugin } from './core/index.js';
import * as plugins from './plugins/index.js';
import * as tools from './tools/index.js'; // 工具都是 $ 开头的函数
import { simpleCrawl } from './simpleCrawl.js';
//* 这个是通用版本，直接将 JSpider 整合成一个大对象

Object.assign(JSpider, tools, {
    plugins,
    Plugin,
    simpleCrawl,
});

export default JSpider;
