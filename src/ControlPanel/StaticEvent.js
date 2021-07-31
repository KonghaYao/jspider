/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskGroup } from '../TaskSystem/TaskGroup';

export default {
    // ! 即使这些函数不会被使用，也必须使用注释的方式写下
    stateChange(state) {
        this.state = state;
    },
    'Flow:stop'() {
        this._stop = true;
    },
    'Flow:start'() {
        console.log('start');
        this._stop = false;
    },

    // 'Flow:input'() {}
    // 'Spider:clearFlow'(){}
    'Task:success'(task) {
        task.$commit('complete');
        if (task instanceof TaskGroup) {
            task.$destroy();
        }
    },
    'Task:error'(error) {
        console.log(error);
    },
    'Task:complete'() {},
};
