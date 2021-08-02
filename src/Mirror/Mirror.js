/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventHub } from '../utils/EventHub';

/**
 * Mirror 是 JSpider 中的数据外放接口
 *
 * MessageHub 是集合所有事件的事件中心，
 *  当 MessageHub 被 emit 时, MessageHub 发出相关的 Update 进行视图的更新
 *  所有的外放接口使用 rxjs 进行 subscribe
 */

const MessageHub = new EventHub();

// Task 数据发生改变时
const TaskUpdate = MessageHub.createSource$('TaskUpdate');

export { MessageHub, TaskUpdate };
