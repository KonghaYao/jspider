/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { pipe, of, EMPTY, timer, from } from 'rxjs';
import { concatMap, catchError, delayWhen, mergeMap, bufferTime, filter } from 'rxjs/operators';
import { retryAndDelay } from './retryAndDelay.js';

export function concurrent(
    promiseFunc, // 并发的异步函数用于接收上流来的数据
    {
        retry = 3, // 若发生失败时最大重试次数
        buffer = 3, // 每次并发处理的次数
        delay = 1000, // 每个分组之间的间隔
        retryDelay = 300, // 每次延迟的次数；与 retryAndDelay 相同的一个函数
        handleError = function handleError(err, err$) {
            // 重试错误时的操作
            throw new Error(err, err$);
        },
    } = {},
) {
    // 异步函数的处理工作
    const asyncSingle = (data) =>
        of(data).pipe(
            mergeMap((res) => {
                // mergeMap 可以直接将 Observable 或者是 Promise 转化为正常流
                return promiseFunc(res);
            }),
            retryAndDelay(retry, retryDelay),
            catchError((...args) => {
                // 自定义错误处理
                const clear = handleError instanceof Function ? handleError(...args) : handleError;

                return clear || EMPTY; // 通过 EMPTY 取消掉这个订阅
            }),
        );

    // 这是 concurrent 的核心逻辑
    return pipe(
        // ! 这里的 bufferTime 的第二个参数保持 undefined 即可
        bufferTime(1000, undefined, buffer),
        filter((i) => i.length),
        // 无论如何每一组都会被推迟的时间量
        delayWhen((_, index) => timer(index * delay)),
        mergeMap((array) => from(array)),
        concatMap(asyncSingle),
    );
}
