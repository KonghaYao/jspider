import { Task } from './Task';
export class TaskGroup extends Task {
    constructor(TaskArray) {
        const output = new Set(TaskArray);
        super(output, TaskArray[0]._spiderUUID);
        this.#linkTask();
    }
    #linkTask() {
        this._output.forEach((task) => (task._belongTo = this));
    }
    $breakLink() {
        this._output.clear();
        this.$destroy();
    }
    // 单独删除一个连接
    $removeLink(task) {
        this._output.delete(task);
    }
}
