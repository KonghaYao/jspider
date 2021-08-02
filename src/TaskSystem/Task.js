import { createTaskStore } from './TaskState.js';
import { EventHub } from '../utils/EventHub.js';
export class Task {
    _belongTo = null; // 当有 TaskGroup 时，指向 Group
    constructor(originData, spiderUUID) {
        this.$EventHub = new EventHub({}, this);
        // 由 store 验证相关的正确性
        this.$store = createTaskStore({ spiderUUID, originData });
    }

    // Plugin 的汇报口
    $commit(type, ...payload) {
        // 遵循内先外后的函数触发

        const result = this.$store[type](...payload);
        this.$EventHub.emit(type, ...payload);
        return result;
    }

    // 外部系统的监控口
    $on(...args) {
        return this.$EventHub.on(...args);
    }
    $off(...args) {
        return this.$EventHub.off(...args);
    }
    $isSameTask(task) {
        return task.$store.spiderUUID === this.$store.spiderUUID && task.$store.uuid === this.$store.uuid;
    }
    $checkRepeat(uuid) {
        return this.$store.dataSlide.includes(uuid);
    }
    $destroy() {
        this._belongTo = null;
        this.$commit('destroy'); // 先通知外部，该 Task 被销毁
        this.$EventHub.off('*'); // 后进行自身销毁
    }
    get [Symbol.toStringTag]() {
        return 'Task';
    }
}
