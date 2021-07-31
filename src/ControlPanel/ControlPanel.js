/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import staticEvent from './StaticEvent';
import { TaskManager } from './TaskManager';
import { functionQueue } from '../utils/functionQueue';
import { EventHub } from '../utils/EventHub';
import { pauseToggle } from '../utils/pauseToggle';

// ControlPanel 是 JSpider 内部的事件和数据中心。
// 全部 JSpider 涉及到的边界中，ControlPanel 只有一个，但是 View 可以有多个，而 Spider 就是 View 中的一个
// 用于分发数据流，提供 Task 的状态变更。
// TODO 并且可以提供数据的响应给类似于 UI 界面形成可视化

export class ControlPanel {
    state = 'free'; // 'free' 'preparing'
    #runningQueue = new functionQueue(); // init 阶段的 Queue 队列
    _stop = false; // 用于直接切断 spiderSource$ 的流
    spiderSource$ = null;
    _pipeline = null;
    TaskManager = new TaskManager();
    constructor() {
        this.$EventHub = new EventHub(staticEvent, this);
    }
    // ! 这是一个完整的流控
    _createLogicLine() {
        this.spiderSource$ = this.$EventHub.createSource$('Flow:input').pipe(
            pauseToggle(
                this.$EventHub.createSource$('Flow:stop'),

                this.$EventHub.createSource$('Flow:start'),
            ),
            this._pipeline.operator,
        );

        this.spiderSource$.subscribe(
            // 所有的事件分配到 staticEvent 中去写
            (task) => this.$EventHub.emit('Task:success', task),
            (error) => this.$EventHub.emit('Task:error', error),
            () => this.$EventHub.emit('Task:complete'),
        );
        this.$EventHub.emit('Flow:stop');
    }

    set pipeline(value) {
        if (this.state === 'free') {
            this.$EventHub.emit('stateChange', 'preparing');
            this._pipeline = value;
            this.#runningQueue.enQueue(
                () => this._pipeline.preparePipeline(),
                () => {
                    this.$EventHub.emit('Spider:clearFlow'); // 先注销流
                    this._createLogicLine(); // 创建新流
                    this.$EventHub.emit('stateChange', 'free');
                },
            );
        } else {
            throw new Error('在运行阶段是不能够进行操作的哦');
        }
    }

    // startInfo --TaskManager.createTask--> Task --emit--EventHub--> Flow
    createFlow(infos) {
        return this.#runningQueue.enQueue(() => {
            infos.forEach((info) => {
                if (!this._pipeline) throw new Error('没有创建pipeline');
                const task = this.TaskManager.createTask(info, this._pipeline.UUID);
                this.$EventHub.emit('Flow:input', task);
            });
        });
    }
    startFlow() {
        // 开始流必须要等待其他事件完成
        this.#runningQueue.enQueue(() => {
            this.$EventHub.emit('Flow:start');
        });
    }

    stopFlow() {
        // 关闭流不需要等待其他事件完成
        this.$EventHub.emit('Flow:stop');
    }
}
