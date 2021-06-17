import { retryAndDelay } from "./retryAndDelay.js";
import { pipe, from, of } from "rxjs";
import { bufferCount, mergeMap, concatMap, switchMap, catchError } from "rxjs/operators";
// 并发控制操作符
export const concurrent = (
    promiseFunc, // 并发的异步函数用于接收上流来的数据
    {
        retry = 3, // 若发生失败时最大重试次数
        buffer = 3, // 每次并发处理的次数
        delay = 300, // 每次延迟的次数；与 retryAndDelay 相同的一个函数
        handleError = function (err, err$) {
            // 重试错误时的操作
            throw err;
        },
    } = {}
) =>
    pipe(
        bufferCount(buffer),
        concatMap((array) =>
            from(array).pipe(
                mergeMap((...args) =>
                    of(args).pipe(
                        switchMap((res) => from(promiseFunc(...res))),
                        retryAndDelay(retry, delay),
                        catchError(handleError)
                    )
                )
            )
        )
    );
