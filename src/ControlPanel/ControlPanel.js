import staticEvent from './StaticEvent';
import { TaskManager } from './TaskManager';
import { functionQueue } from '../utils/functionQueue';
import { EventHub } from './EventHub';
import { pauseWhile } from '../utils/pauseWhile';

// ControlPanel 是 JSpider 内部的事件和数据中心。
// 全部 JSpider 涉及到的边界中，ControlPanel 只有一个，但是 View 可以有多个，而 Spider 就是 View 中的一个
// 用于分发数据流，提供 Task 的状态变更。
// TODO 并且可以提供数据的响应给类似于 UI 界面形成可视化

export class ControlPanel {
    state = 'free'; // 'free' 'preparing'
    #runningQueue = new functionQueue(); // init 阶段的 Queue 队列
    #stop = false; // 用于直接切断 spiderSource$ 的流
    spiderSource$ = null;
    _pipeline = null;
    TaskManager = new TaskManager();
    constructor() {
        this.$EventHub = new EventHub(staticEvent, this);
        this.#stopFlow = this.$EventHub.createSource$('Flow:stop');
    }
    // 这是一个完整的流控
    _createLogicLine() {
        this.spiderSource$ = this.$EventHub.createSource$('Flow:start').pipe(
            this._pipeline.operator,
            pauseWhile(() => this.#stop),
        );
        this.spiderSource$.subscribe(
            // 所有的事件分配到 staticEvent 中去写
            (task) => this.$EventHub.emit('Task:success', task),
            (error) => this.$EventHub.emit('Task:error', error),
            () => this.$EventHub.emit('Task:complete'),
        );
    }

    set pipeline(value) {
        if (this.state === 'free') {
            this.$EventHub.emit('stateChange', 'preparing');
            this._pipeline = value;
            this.#runningQueue.enQueue(
                () => this._pipeline.preparePipeline(),
                () => {
                    this.$EventHub.emit('stopFlow'); // 先注销流
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
        this.$EventHub.emit('Flow:start');
        return this.#runningQueue.enQueue(() => {
            infos.forEach((info) => {
                if (!this._pipeline) throw new Error('没有创建pipeline');
                const task = this.TaskManager.createTask(info, this._pipeline.UUID);
                this.$EventHub.emit('Flow:start', task);
            });
        });
    }
    // TEST 测试功能
    stopFlow() {
        this.$EventHub.emit('Flow:stop');
    }
}
