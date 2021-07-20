/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:06:34
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-07-16 20:24:50
 */
/*
关于 PLUGIN 的参数

1. init 函数 (可以没有): 在 spider 预处理的时候会对所有 PLUGIN 的 init 函数进行异步顺序调用保证插件在运行前载入。

2. main 函数 (主要函数): 相当于承接上一个 PLUGIN 的 main 函数导出的数据，并实现功能上的数据处理和返回

3. error 函数 (错误处理函数): 相当于在 main 函数 error 时调用的函数，可以取消这个流，也可以处理完 error 后继续执行

4. complete 函数: 没有发生任何的 error 的情况下完成 main 方法时调用的函数

5. options 属性对象: 这个是接受所有参数的一个对象，在创建 Plugin 时，如果在 Object.options 写入了一个对象，则能够被全局以 this.options 得到，方便上面的函数进行调用

*这里提一件事情，如果是在 options 里面写了函数，然后在 Plugin 内部写了相应调用函数的逻辑，就可以实现针对每个输入进行不同的返回*

*/
import { EMPTY, from, Observable, of, pipe } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { createUUID } from '../utils/createUUID.js';
import { PluginError } from '../Errors/errors.js';

class PLUGIN {
    constructor({
        forceRetry = true,
        saveResult = false,
        name = null,
        main,
        init = null,
        error = null,
        complete = null,
        options = {},
        operator,
    }) {
        const uuid = createUUID(main.toString());
        if (operator) this.operator = operator;
        // 写入自身中
        Object.assign(this, {
            name: name || uuid, // 名称，一般用作提示标记
            uuid, // 唯一标识
            main, // Plugin 中的功能性函数
            init, // 初始化整个 Plugin 的函数
            error, // 函数错误时的事件
            complete, // 函数完成时的提示事件
            options, // main 函数接收的 options
            saveResult, // 是否保存结果到每一个 Task 中
            forceRetry, // 是否强制重新使用 Plugin
        });
    }

    // 对 main 函数外包一层，直接启动 main 函数的执行，返回一条流
    TaskStarter(task) {
        return of(task).pipe(
            // 设置跳过 Plugin 的逻辑
            switchMap((task) => {
                if (task.$checkRepeat(this.uuid) || this.forceRetry) {
                    return of(task).pipe(
                        map((task) => [task.$commit('start', this.uuid), task._originData]),

                        switchMap(([data, originData]) => {
                            const result = this.main(data, originData);
                            return result instanceof Promise || result instanceof Observable
                                ? from(result)
                                : of(result);
                        }),
                        map((result) => {
                            task.$commit('success', result, this.uuid, this.saveResult);
                            return task;
                        }),
                    );
                }
                console.log('跳过一个目标');
                return of(task);
            }),
            // 捕获到异常
            catchError((...args) => {
                if (this.error instanceof Function) {
                    const afterError = this.error(task, ...args);
                    if (afterError) throw new PluginError(afterError);

                    return EMPTY;
                }
                throw new PluginError(args[0]);
            }),
            // 完成 Plugin 时的事件
            tap((task) => this.complete && this.complete(task)),
        );
    }

    operator(context) {
        // ! 这个是默认的 operator 函数
        // context 为上层的 JSpider 实例
        return pipe(switchMap((task) => this.TaskStarter(task)));
    }
}

export function Plugin(Process) {
    if (Process instanceof Function) {
        return new PLUGIN({
            main: Process,
        });
    }
    if (Process instanceof Object) {
        return new PLUGIN(Process);
    }
    throw new PluginError('Plugin 必须是一个函数或者是 Plugin 描述对象');
}
export { PLUGIN };
