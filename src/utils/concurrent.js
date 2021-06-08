import { from, pipe } from "rxjs";
import { mergeMap, delay, bufferCount, concatMap, map } from "rxjs/operators";
// 并发核心
// 通常用于异步并发请求，但是它不局限于请求！
const concurrent = ($function, { $delay = 200, $count = 3 }) =>
    pipe(
        bufferCount($count),
        concatMap((item) => {
            return from(item).pipe(
                mergeMap((task) => from($function(task))),
                delay($delay)
            );
        })
    );

export { concurrent as default };
