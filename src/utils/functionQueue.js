/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * 函数用途描述
 * 这个是用于 async 函数队列 连续执行的函数，只要 enQueue 之后就会连续执行，直至停止
 */

export class functionQueue {
    QueuePromise = Promise.resolve();
    constructor() {}
    enQueue(...args) {
        this.QueuePromise = args.reduce((promise, current) => {
            return promise.then(current);
        }, this.QueuePromise);
        return this;
    }
}
