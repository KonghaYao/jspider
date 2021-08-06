import { TaskUpdate, ControlUpdate } from '../Mirror/Mirror.js';

// 注意，这里只要 View 被实例化了，它就会订阅数据
export class View {
    constructor({ tasks = false, controlPanel = false } = {}) {
        this.config = {
            tasks,
            controlPanel,
        };

        if (tasks) {
            this.#subscriber.push(TaskUpdate.subscribe((data) => this._update(data)));
        }
        if (controlPanel) {
            this.#subscriber.push(ControlUpdate.subscribe((data) => this._change(data)));
        }
    }
    config = {};
    #subscriber = [];
    $destroy() {
        this.#subscriber.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
