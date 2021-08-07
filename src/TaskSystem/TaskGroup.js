/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { Task } from './Task';
export class TaskGroup extends Task {
    constructor(TaskArray, spiderUUID = '00000') {
        const output = new Set(TaskArray);
        super(output, TaskArray?.[0]?.spiderUUID || spiderUUID);
        this.#linkTask();
    }
    #linkTask() {
        this.originData.forEach((task) => {
            task._belongTo = this;
            task.$on('destroy', () => this.$removeLink(task));
        });
    }
    // Plugin 的汇报口
    $commit(type, ...payload) {
        // 扩散事件
        const result = [];
        this.originData.forEach((task) => result.push(task.$commit(type, ...payload)));
        const selfOutput = this.$EventHub.emit(type, ...payload);

        if (type === 'start' && this._output) return selfOutput[0];
        return result;
    }
    // 删除所有的 link
    $destroy() {
        const copy = [...this.originData];
        this.$EventHub.emit('destroy'); // 不进行事件的扩散, 只是自身的报销
        return copy;
    }
    // 单独删除一个连接
    $removeLink(task) {
        this.originData.delete(task);
    }
    get [Symbol.toStringTag]() {
        return 'TaskGroup';
    }
}
