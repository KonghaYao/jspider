/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:06:13
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:06:13
 */
import { pipe, timer } from "rxjs";
import { delayWhen, scan, retryWhen } from "rxjs/operators";

// delay 可以是一个函数用于产生数字
export const retryAndDelay = (count, delay) =>
    pipe(
        retryWhen((err$) =>
            err$.pipe(
                scan((errCount, err) => {
                    console.log("尝试次数", errCount, err);
                    if (errCount >= count) throw new Error("超出尝试次数", err);
                    return errCount + 1;
                }, 0),
                delayWhen((...args) => {
                    switch (typeof delay) {
                        case "string":
                        case "number":
                            return timer(parseInt(delay, 10));
                        case "function":
                            return timer(delay(...args));
                        default:
                            throw new Error("您输入的 delay 错误");
                    }
                }),
            ),
        ),
    );
