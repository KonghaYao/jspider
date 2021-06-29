/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:05:59
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:05:59
 */
export { JSpider, Task, TaskGroup, Plugin } from './core/index.js';
export * as plugins from './plugins/index.js';
export * as tools from './tools/index.js'; // 工具都是 $ 开头的函数
export { simpleCrawl } from './simpleCrawl.js';
//* 这是一个便于进行 treeShake 的版本，将会打包成 JSpider.js
