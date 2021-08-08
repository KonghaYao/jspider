/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-invalid-this */

import { Plugin } from '@src/Pipeline/PluginSystem.js';
import { of } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { TaskGroup } from '../../src/TaskSystem/TaskGroup';
import { BufferCountIn } from './utils/bufferCountIn';
export function Combine(number, waitTime = 1000, options = {}) {
    return Plugin({
        name: 'Combine', // 这个 name 是负责进行监控的标志符号
        options, // 接收所有的参数，提供给所有函数使用
        operator() {
            // 复写 operator
            return (source) =>
                source.pipe(
                    BufferCountIn(number, waitTime),
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
