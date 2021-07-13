import { Task } from './Task';
export class TaskGroup extends Task {
    constructor(TaskArray) {
        const output = new Set(TaskArray);
        super(output, TaskArray[0]._spiderUUID);
        this.#linkTask();
    }
    #linkTask() {
        this._originData.forEach((task) => (task._belongTo = this));
    }
    // Plugin 的汇报口
    $commit(type, ...payload) {
        const result = this.$EventHub.emit(type, ...payload);
        // 扩散事件
        this._originData.forEach((task) => task.$commit(type, ...payload));
        return result;
    }
    // 删除所有的 link
    $breakLink() {
        this._originData.clear();
        this.$destroy();
    }
    // 单独删除一个连接
    $removeLink(task) {
        this._originData.delete(task);
    }
    get [Symbol.toStringTag]() {
        return 'TaskGroup';
    }
}
