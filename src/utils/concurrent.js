import { retryAndDelay } from "./retryAndDelay.js";
import { pipe, of, EMPTY, timer, Observable, from } from "rxjs";
import {
    bufferCount,
    concatMap,
    switchMap,
    catchError,
    delayWhen
} from "rxjs/operators";

/**
 * 并发控制操作符
 * @date 2021-06-28
 * @param {any} promiseFunc
 * @param {any} options
 * @return {any}
 */
export function concurrent(
    promiseFunc, // 并发的异步函数用于接收上流来的数据
    {
        retry = 3, // 若发生失败时最大重试次数
        buffer = 3, // 每次并发处理的次数
        delay = 0, // 每个分组之间的间隔
        retryDelay = 300, // 每次延迟的次数；与 retryAndDelay 相同的一个函数
        handleError = function (err, err$) {
            // 重试错误时的操作
            throw new Error(err, err$);
        }
    } = {}
) {
    const asyncSingle = (data) =>
        of(data).pipe(
            switchMap((res) => {
                const result = promiseFunc(res); // 当 promiseFunc 返回一个 Observable 时可以通过下面的方式进行统一
                return result instanceof Observable ? from(result) : of(result);
            }),
            retryAndDelay(retry, retryDelay),
            catchError((...args) => {
                const clear = handleError(...args); // 自定义错误处理
                return clear || EMPTY; // 通过 EMPTY 取消掉这个订阅
            })
        );
    return pipe(
        bufferCount(buffer),
        delayWhen((_, index) => {
            return timer(index * delay);
        }), // 无论如何每一组都会被推迟的时间量
        switchMap((array) => of(...array)),
        concatMap(asyncSingle)
    );
}
