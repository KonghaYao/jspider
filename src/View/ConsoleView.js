import { View } from './View.js';
export class ConsoleView extends View {
    constructor(config) {
        super(Object.assign(config, { tasks: true, controlPanel: true }));
    }
    tasks = [];
    #uuidArray = [];
    _update(data) {
        const index = this.#uuidArray.indexOf(data.uuid);
        if (index === -1) {
            this.#uuidArray.push(data.uuid);
            this.tasks.push(data);
        } else {
            // 并不是直接赋值，而是通过数组的 splice 方式进行数组的更新，这样可以方便 Vue 渲染
            this.tasks.splice(index, 1, data);
        }
    }
    _change({ name, value = '' }) {}
}
