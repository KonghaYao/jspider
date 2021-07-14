/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:06:08
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-07-14 19:29:59
 */
import { pipe, of, EMPTY, timer, from } from 'rxjs';
import { bufferCount, concatMap, catchError, delayWhen, switchMap, mergeMap } from 'rxjs/operators';
import { retryAndDelay } from './retryAndDelay.js';

/**
 * 并发控制操作符
 * @date 2021-06-28
 * @param {any} promiseFunc
 * @param {any} options
 * @return {any}
 */

// TODO concurrent 在额没有达到 buffer 数目的时候，会无限延迟
export function concurrent(
    promiseFunc, // 并发的异步函数用于接收上流来的数据
    {
        retry = 3, // 若发生失败时最大重试次数
        buffer = 3, // 每次并发处理的次数
        delay = 0, // 每个分组之间的间隔
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
        bufferCount(buffer),
        // 无论如何每一组都会被推迟的时间量
        delayWhen((_, index) => timer(index * delay)),
        mergeMap((array) => from(array)),
        concatMap(asyncSingle),
    );
}
