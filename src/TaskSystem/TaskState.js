/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */

import { types, getSnapshot, applySnapshot, destroy } from 'mobx-state-tree';
import { createProps } from './TaskProps.js';
import { AutoType, TaskState } from './TaskTypes.js';

const TaskStore = types
    .model({
        uuid: types.string,
        spiderUUID: types.string, // JSpider 的实例的 UUID
        dataSlide: types.array(types.string), // 更改为存储 UUID
        dataSlideUUID: types.string, // 上一次完成的 UUID
        createdAt: types.Date,
        errorMessage: types.optional(types.string, ''),
        status: TaskState, // 这个位置是为了让 Plugin 能识别的一个标识
        updatedAt: types.Date,
        // 记录完成过的 uuid 的信息，只有在 StaticEvent.js 中才能更改
        originData: types.maybe(AutoType.anyType),

        // 每个中间件传出的数据
        output: types.maybe(AutoType.anyType),
    })
    .actions((self) => {
        return {
            $backup() {
                return getSnapshot(self);
            },
            $import(backup) {
                return applySnapshot(backup);
            },

            start() {
                if (self.status === 'pending') throw new Error('Task 处在 pending 状态');
                self.dataSlide = [];
                self.dataSlideUUID = '';
                self.status = 'pending';
                return self.output || self.originData;
            },
            success(output, uuid) {
                self.status = 'free';
                self.output = output;
                this._addUUIDToDataSlide(uuid);
            },
            complete(uuid) {
                self.status = 'complete';
                this._addUUIDToDataSlide(uuid);
            },
            error(err = '', uuid) {
                self.status = 'error';
                self.errorMessage = err;
                this._addUUIDToDataSlide(uuid);
            },
            destroy() {
                destroy(self);
            },
            _addUUIDToDataSlide(uuid) {
                if (uuid) {
                    self.dataSlide.push(uuid);
                    self.dataSlideUUID = uuid;
                }
            },
        };
    });
export function createTaskStore(model) {
    return TaskStore.create(createProps(model));
}
