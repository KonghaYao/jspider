/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { Task } from './Task';
export class TaskGroup extends Task {
    constructor(TaskArray, spiderUUID = '00000') {
        super({}, TaskArray?.[0]?.spiderUUID || spiderUUID);
        this.member = new Set(TaskArray);
        this.#linkTask();
    }
    #linkTask() {
        this.member.forEach((task) => {
            task._belongTo = this;
            task.$on('destroy', () => this.$removeLink(task));
        });
    }

    // 当第一次 start 的时候，返回的是完全不一样的 Task 的信息
    // 经过第一个 start 之后，所有 Task 中的数据被统一，这个标识改为 true
    consume = false;
    // Plugin 的汇报口
    $commit(type, ...payload) {
        // 扩散事件 Set 类型不能 map
        const result = [];
        this.member.forEach((task) => result.push(task.$commit(type, ...payload)));
        this.$EventHub.emit(type, ...payload);

        if (this.consume) return result[0];
        if (type === 'start') this.consume = true;
        return result;
    }
    // 删除所有的 link
    $destroy() {
        this.$EventHub.emit('destroy'); // 不进行事件的扩散, 只是自身的报销的消息被传开
        this.$store.destroy();
        const tasks = this.member;
        this.member = null;

        return tasks;
    }
    // 单独删除一个连接
    $removeLink(task) {
        this.member.delete(task);
    }
    get [Symbol.toStringTag]() {
        return 'TaskGroup';
    }
}
