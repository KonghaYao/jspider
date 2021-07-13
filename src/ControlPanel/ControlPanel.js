import { of } from 'rxjs';
import { fromEventPattern } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import staticEvent from './StaticEvent';
import { Task } from '../TaskSystem/Task';
import { functionQueue } from '../utils/functionQueue';
import { EventHub } from './EventHub';
// ControlPanel 是 JSpider 中只实例化一次的 system
// 用于分发数据流，提供 Task 的状态变更。
// TODO 并且可以提供数据的响应给类似于 UI 界面形成可视化

export class ControlPanel {
    state = 'free'; // 'free' 'preparing'
    #runningQueue = new functionQueue(); // 准备阶段的 Queue 队列

    _pipeline = null;

    constructor() {
        this.EventHub = new EventHub(staticEvent, this);
        this._createLogicLine();
    }
    // 这是一个完整的流控
    _createLogicLine() {
        this.spiderSource$ = fromEventPattern(
            (handle) => this.EventHub.on('runPipeline', handle),
            (handle) => this.EventHub.off('runPipeline', handle),
        ).pipe(
            // ! 这里采用 switchMap 的方式引用动态的 operator
            switchMap((i) => of(i).pipe(this._pipeline)),
            share(),
        );
        this.spiderSource$.subscribe(
            (task) => this.EventHub.emit('Task:success', task),
            (error) => this.EventHub.emit('Task:error', error),
            () => this.EventHub.emit('Task:complete'),
        );
    }

    set pipeline(value) {
        if (this.state === 'free') {
            this.EventHub.emit('stateChange', 'preparing');
            this._pipeline = value;
            this.#runningQueue.enQueue(async () => {
                await this._pipeline.preparePipeline();
                this.EventHub.emit('stateChange', 'free');
            });
        } else {
            throw new Error('在运行阶段是不能够进行操作的哦');
        }
    }

    // startInfo -> Task -> Flow
    createFlow(...infos) {
        if (this.pipeline) throw new Error('没有创建pipeline');
        infos.forEach((info) => {
            const task = new Task(info, this.pipeline.UUID);
            this.EventHub.emit('runPipeline', task);
        });
    }
}
