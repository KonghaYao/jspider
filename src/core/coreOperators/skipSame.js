/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:46
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 16:27:47
 */
import { pipe } from "rxjs";
import { skipWhile } from "rxjs/operators";

export const skipSame = (context) =>
    pipe(
        skipWhile((task) => {
            // 跳过已经完成的项目
            if (task._status === "complete" && task._completeUUID === context._processUUID) {
                console.warn("跳过一个目标");
                return true;
            }
            return false;
        }),
    );
