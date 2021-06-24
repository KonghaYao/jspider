/*
关于 PLUGIN 的生命周期

1. init 函数 (可以没有): 在 spider 预处理的时候会对所有 PLUGIN 的 init 函数进行异步顺序调用保证插件在运行前载入。

2. main 函数 (主要函数): 相当于承接上一个 PLUGIN 的 main 函数导出的数据，并实现功能上的数据处理和返回

3. error 函数 (错误处理函数): 相当于在 main 函数 error 时调用的函数，可以取消这个流，也可以处理完 error 后继续执行

4. complete 函数: 没有发生任何的 error 的情况下完成 main 方法时调用的函数

*/

import { of, pipe } from "rxjs";
import { switchMap } from "rxjs/operators";
import { createUUID } from "./createUUID.js";
class PLUGIN {
    constructor({ forceRetry = false, name = null, main, init = null, error = null, complete = null, options = null, saveMiddleResult = false }) {
        const uuid = createUUID(main.toString());

        Object.assign(
            {},
            {
                name: name || uuid, // 名称，一般用作提示标记
                uuid, // 唯一标识
                main, // Plugin 中的功能性函数
                init, // 初始化整个 Plugin 的函数
                error, // 函数错误时的事件
                complete, // 函数完成时的提示事件
                options, // main 函数接收的 options
                saveMiddleResult, // 是否保存结果到每一个 Task 中
                forceRetry, // 是否强制重新使用 Plugin
            }
        );
    }
    // 对 main 函数外包一层
    TaskWrapper(Task) {
        // 检测重复进行的 Task
        if (Task.$CheckRepeat(this.uuid) || this.forceRetry) {
            const originData = Task.$commit("start", this.uuid, this.saveMiddleResult);
            try {
                const result = this.main(originData, this.options);
                Task.$commit("success", result, this.uuid, this.saveMiddleResult);
                this.complete && this.complete(Task);
            } catch (e) {
                this.error && this.error(e);
            }
        }
        return Task;
    }

    operator(context) {
        // context 为上层的 JSpider 实例
        return pipe(switchMap((task) => of(this.TaskWrapper(task))));
    }
}
export function Plugin(Process) {
    if (Process instanceof Function) {
        return new PLUGIN({
            main: Process,
        });
    } else if (Process instanceof Object) {
        return new Plugin(Process);
    } else {
        throw new Error("Plugin must be input a function or Object");
    }
}
