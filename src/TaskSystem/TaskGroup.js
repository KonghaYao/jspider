import { Task } from './Task';
export class TaskGroup extends Task {
    constructor(TaskArray, _spiderUUID = '00000') {
        const output = new Set(TaskArray);
        super(output, TaskArray?.[0]?._spiderUUID || _spiderUUID);
        this.#linkTask();
    }
    #linkTask() {
        this._originData.forEach((task) => {
            task._belongTo = this;
            task.$on('destroy', () => this.$removeLink(task));
        });
    }
    // Plugin 的汇报口
    $commit(type, ...payload) {
        const result = [];
        this.$EventHub.emit(type, ...payload);
        // 扩散事件
        this._originData.forEach((task) => result.push(task.$commit(type, ...payload)));
        return result;
    }
    // 删除所有的 link
    $destroy() {
        const copy = [...this._originData];
        // 不进行事件的扩散
        this.$EventHub.emit('destroy');
        return copy;
    }
    // 单独删除一个连接
    $removeLink(task) {
        this._originData.delete(task);
    }
    get [Symbol.toStringTag]() {
        return 'TaskGroup';
    }
}
