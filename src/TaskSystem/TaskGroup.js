/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { Task } from './Task';
export class TaskGroup extends Task {
    constructor(TaskArray, _spiderUUID = '00000') {
        const output = new Set(TaskArray);
        super(output, TaskArray?.[0]?._spiderUUID || _spiderUUID);
        this.#linkTask();
    }
    #linkTask() {
        this._originData.forEach((task) => {
            task._belongTo = this;
            task.$on('destroy', () => this.$removeLink(task));
        });
    }
    // Plugin 的汇报口
    $commit(type, ...payload) {
        // 扩散事件
        const result = [];
        this._originData.forEach((task) => result.push(task.$commit(type, ...payload)));
        const selfOutput = this.$EventHub.emit(type, ...payload);

        if (type === 'start' && this._output) return selfOutput[0];
        return result;
    }
    // 删除所有的 link
    $destroy() {
        const copy = [...this._originData];
        // 不进行事件的扩散
        this.$EventHub.emit('destroy');
        return copy;
    }
    // 单独删除一个连接
    $removeLink(task) {
        this._originData.delete(task);
    }
    get [Symbol.toStringTag]() {
        return 'TaskGroup';
    }
}
