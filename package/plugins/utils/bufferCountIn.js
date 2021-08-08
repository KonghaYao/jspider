/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { noop, Observable } from 'rxjs';

// 收集 3 个数据，但是前后之间间隔不超过 1000 ms
// 超过 1000 ms 时，放弃收集，直接返回 buffer 的数据
export function BufferCountIn(countNumber = 3, maxWaitTime = 1000) {
    return (observable) =>
        new Observable((subscriber) => {
            const buffers = new Set();
            let TimeOut = 0; // 0 表示没有计时器

            // 发送所有的数据，并将定时器删除
            const sendAll = () => {
                if (buffers.size) {
                    subscriber.next([...buffers]);
                    buffers.clear();
                }
            };
            // 删除定时器标记, 没有时忽略
            const deleteTimeout = () => {
                if (TimeOut) {
                    clearTimeout(TimeOut);
                    TimeOut = 0;
                }
            };
            const UpdateTimeout = () => {
                TimeOut = setTimeout(sendAll, maxWaitTime);
            };
            const subscription = observable.subscribe(
                (value) => {
                    console.log(TimeOut);
                    // buffer.size 为 0 时，不设置定时，但是收集；

                    // 2 时，发送并重置定时器
                    // 其他 时，收集并设置定时器；
                    deleteTimeout();
                    switch (buffers.size) {
                        case 0:
                            return buffers.add(value);
                        case countNumber - 1:
                            buffers.add(value);
                            return sendAll();
                        default:
                            UpdateTimeout();
                            return buffers.add(value);
                    }
                },
                noop,
                () => {
                    sendAll();
                    subscriber.complete();
                },
            );
            return () => {
                buffers.clear();
                subscription.unsubscribe();
            };
        });
}
