/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
// 每个 Task 拥有的静态事件
// 这些事件一般通过 $commit(eventName,payload) 进行执行
// ! this 被绑定为 Task 的实例
export const staticEvent = {
    start(uuid) {
        this._status = 'busy';
        // ! 这里会有一个清空这个 key 的 value 的情况，这是因为 start 是强制的
        this._progress.set(uuid, { uuid, process: 'start' });

        return this._output || this._originData;
    },
    success(output, uuid) {
        this._status = 'free';
        this._progress.set(uuid, { uuid, process: 'success', output });
        this._output = output;
    },
    complete(uuid) {
        this._status = 'complete';
    },
    error(err, uuid) {
        this._status = 'error';
        this._progress.set(uuid, { uuid, process: 'error', err });
    },
    destroy() {
        this._process = [];
        this._output = null;
        this._belongTo = null;
        this._originData = null;
        this.$off('*');
    },
};
