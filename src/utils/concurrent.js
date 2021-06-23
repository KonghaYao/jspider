import { retryAndDelay } from "./retryAndDelay.js";
import { pipe, from, of, EMPTY } from "rxjs";
import { bufferCount, mergeMap, concatMap, switchMap, catchError } from "rxjs/operators";

// 并发控制操作符
export function concurrent(
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
) {
    const single = (res) => from(promiseFunc(...res));
    return pipe(
        bufferCount(buffer),
        concatMap((array) =>
            from(array).pipe(
                mergeMap((...args) =>
                    of(args).pipe(
                        switchMap(single),

                        retryAndDelay(retry, delay),

                        catchError((...args) => {
                            const clear = handleError(...args); // 自定义错误处理
                            return clear || EMPTY; // 通过 EMPTY 取消掉这个订阅
                        })
                    )
                )
            )
        )
    );
}
