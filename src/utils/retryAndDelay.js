/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { pipe, timer } from 'rxjs';
import { delayWhen, scan, retryWhen } from 'rxjs/operators';
import { RetryError } from '../Errors/errors';

// delay 可以是一个函数用于产生数字
export const retryAndDelay = (count, delay) =>
    pipe(
        retryWhen((err$) =>
            err$.pipe(
                scan((errCount, err) => {
                    console.log('尝试次数', errCount, err);
                    if (errCount >= count) throw new RetryError('超出尝试次数', err);
                    return errCount + 1;
                }, 0),
                delayWhen((...args) => {
                    switch (typeof delay) {
                        case 'string':
                        case 'number':
                            return timer(parseInt(delay, 10));
                        case 'function':
                            return timer(delay(...args));
                        default:
                            throw new RetryError('您输入的 delay 错误');
                    }
                }),
            ),
        ),
    );
