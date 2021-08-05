import { TaskUpdate, ControlUpdate } from '../Mirror/Mirror.js';

// 注意，这里只要 View 被实例化了，它就会订阅数据
export class View {
    constructor({ tasks = false, controlPanel = false } = {}) {
        this.config = {
            tasks,
            controlPanel,
        };

        if (tasks) {
            const a = TaskUpdate.subscribe((data) => this._update(data));
            this.#subscriber.push(a);
        }
        if (controlPanel) {
            const b = ControlUpdate.subscribe((data) => this._change(data));
            this.#subscriber.push(b);
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
