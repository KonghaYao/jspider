/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { types } from 'mobx-state-tree';
const TaskState = types.enumeration('TaskState', ['free', 'pending', 'complete', 'error', 'destroyed']);

const AutoType = {
    anyType: types.custom({
        name: 'any',
        fromSnapshot(value) {
            return value;
        },
        toSnapshot(value) {
            return value;
        },
        isTargetType() {
            return true;
        },
        getValidationMessage() {
            return '';
        },
    }),
};

export { AutoType, TaskState };
