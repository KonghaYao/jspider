import { pipe } from "rxjs";

export const skipSame = (context) =>
    pipe(
        skipWhile((task) => {
            // 跳过已经完成的项目
            if (task._status === "complete" && task._completeUUID === context._processUUID) {
                console.warn("跳过一个目标");
                return true;
            } else {
                return false;
            }
        })
    );
