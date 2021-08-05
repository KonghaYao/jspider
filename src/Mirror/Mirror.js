/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { filter } from 'rxjs/operators';
import { EventHub } from '../utils/EventHub';

/**
 * Mirror 是 JSpider 中的数据外放接口
 *
 * MessageHub 是集合所有事件的事件中心，
 *  当 MessageHub 被 emit 时, MessageHub 发出相关的 Update 进行视图的更新
 *  所有的外放接口使用 rxjs 进行 subscribe
 */

const MessageHub = new EventHub();

// 任何一个 Task 数据发生改变时
const TaskUpdate = MessageHub.createSource$('TaskUpdate');
const watchTasks = function (uuidArray) {
    return TaskUpdate.pipe(filter((task) => uuidArray.includes(task.uuid)));
};

// ControlPanel 的状态发生改变
/**
 * ControlUpdate
 *
 * MessageHub.emit('ControlUpdate', payload);
 * payload: {
 *   name:'your message token',// stateChange flowStart flowStop
 *   value:any,
 * }
 *
 */

const ControlUpdate = MessageHub.createSource$('ControlUpdate');

export { MessageHub, TaskUpdate, ControlUpdate, watchTasks };
