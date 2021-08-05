/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskGroup } from '../TaskSystem/TaskGroup';
import { MessageHub } from '../Mirror/Mirror';
export default {
    // ! 即使这些函数不会被使用，也必须使用注释的方式写下
    stateChange(state) {
        this.status = state;
        MessageHub.emit('ControlUpdate', {
            name: 'stateChange',
            value: state,
        });
    },
    'Flow:stop'() {
        this._stop = true;
        MessageHub.emit('ControlUpdate', {
            name: 'flowStop',
        });
    },
    'Flow:start'() {
        console.log('jspider 开始运行');
        this.status = 'pending';
        this._stop = false;
        MessageHub.emit('ControlUpdate', {
            name: 'flowStart',
        });
    },

    // 'Flow:input'() {}
    // 'Spider:clearFlow'(){}
    'Task:success'(task) {
        task.$commit('complete');
        if (task instanceof TaskGroup) {
            task.$destroy();
        }
        MessageHub.emit('ControlUpdate', {
            name: 'TaskSuccess',
        });
    },
    'Task:error'(error) {
        console.log(error);
    },
    // 'Flow:complete'() {
    //     console.log('线路完成');
    // },
};
