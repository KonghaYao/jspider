/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-invalid-this */

import { Plugin } from '@src/Pipeline/PluginSystem.js';
import { of } from 'rxjs';
import { bufferTime, concatMap, filter } from 'rxjs/operators';
import { TaskGroup } from '../../src/TaskSystem/TaskGroup';
export function Combine(number, waitTime = 5000, options = {}) {
    return Plugin({
        name: 'Combine', // 这个 name 是负责进行监控的标志符号
        options, // 接收所有的参数，提供给所有函数使用
        operator() {
            // 复写 operator
            return (source) =>
                source.pipe(
                    bufferTime(waitTime, undefined, number),
                    filter((i) => i.length), // 必须要进行检测是否为空
                    concatMap((tasks) => of(new TaskGroup(tasks))),
                );
        },
    });
}
export function Break() {
    return Plugin({
        name: 'Break', // 这个 name 是负责进行监控的标志符号
        options,
        operator() {
            return (source) =>
                source.pipe(
                    concatMap((taskGroup) => {
                        if (taskGroup instanceof TaskGroup) {
                            return from(taskGroup.$destroy());
                        } else {
                            return of(taskGroup);
                        }
                    }),
                );
        },
    });
}
