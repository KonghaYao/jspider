/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { pipe } from 'rxjs';
import { createUUID } from '../utils/createUUID';
import { functionQueue } from '../utils/functionQueue';
// Pipeline 是组合 Plugin 实例的工具类，用于创建一个可以不断提供 source 进行固定操作的功能对象。
export class Pipeline {
    constructor(Plugins) {
        this.Plugins = Plugins;
    }
    UUID = null; // 唯一的标识
    operator = null; // 主要被引用的 operator

    #PluginQueue = new functionQueue(); // 准备 Plugin 中的异步 init 事件
    preparePipeline() {
        let uuidString = '';
        // ! 一次遍历实现取出 operator 和 导出 plugin init 函数的 promise 链，并延长 uuidString 用于创建 UUID
        const pipeline = this.Plugins.map((plugin) => {
            uuidString += plugin.operator.toString();

            if (plugin.init instanceof Function) {
                this.#PluginQueue.enQueue(plugin.init);
            }
            // 将 plugin 中的 operator 注入 pipeline 中
            return plugin.operator(this);
        });
        this.operator = pipe(...pipeline);

        this.UUID = createUUID(uuidString);

        return this.#PluginQueue.QueuePromise;
    }
}
