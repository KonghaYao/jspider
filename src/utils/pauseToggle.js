/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { noop, Observable } from 'rxjs';

/**
 * pauseToggle
 * @date 2021-07-20
 * @author KonghaYao
 * @description 用于暂停的 operator, 改编自 bufferToggle 但也不同
 * @param {Observable} openings 发出时触发主流缓存
 * @param {Observable} closings 发出时放出缓存到主流
 * @return {function}
 */
export function pauseToggle(openings, closings) {
    return (observable) =>
        new Observable((subscriber) => {
            const buffers = new Set();
            let closingSubscription = false;
            const subscription = observable.subscribe(
                (value) => {
                    closingSubscription ? buffers.add(value) : subscriber.next(value);
                },
                noop,
                () => {
                    buffers.forEach((item) => subscriber.next(item));
                    subscriber.complete();
                },
            );
            const openingSubscription = openings.subscribe(() => {
                // 输出所有的 buffer
                const emitBuffer = () => {
                    buffers.forEach((item) => subscriber.next(item));
                    buffers.clear();
                    closingSubscription.unsubscribe();
                    closingSubscription = false;
                };
                closingSubscription = closings.subscribe(emitBuffer);
            });
            return () => {
                buffers.clear();
                subscription.unsubscribe();
                openingSubscription.unsubscribe();
                if (closingSubscription) closingSubscription.unsubscribe();
            };
        });
}
