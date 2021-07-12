import { Observable } from 'rxjs';
import { fromEventPattern } from 'rxjs';
import { EventHub } from '../Radio/EventHub';
import { Task } from '../TaskSystem/Task';
import staticEvents from './staticEvents';

// ControlPanel 是 JSpider 中只实例化一次的 system
// 用于分发数据流，提供 Task 的状态变更。
// TODO 并且可以提供数据的响应给类似于 UI 界面形成可视化

export class ControlPanel {
    // 任务方阵，存储形式为一维数组，但是在 UI 中表现为矩形

    #TaskSquare = [];
    #spiderBus = null;
    #SendIndex = 0; // 指向 #TaskSquare 中的完成进度
    constructor() {
        this.#EventHub = new EventHub(staticEvents, this);
        this.spiderSource$ = fromEventPattern(
            (handle) => this.#EventHub.on('startFlow', handle),
            (handle) => this.#EventHub.off('startFlow', handle),
        );
    }
    // startInfo -> Task -> Flow
    createFlow(...infos) {
        if (this.pipeline) throw new Error('没有创建pipeline');
        const tasks = infos.map((info) => new Task(info, this.pipeline.#UUID));
        this.#TaskSquare.push(...tasks);
    }
    _pipeline = null;
    set pipeline(value) {
        if (value instanceof Observable) {
            this._pipeline = value;
            this.spiderBus = this.spiderSource$.pipe(value);
        }
    }
}
