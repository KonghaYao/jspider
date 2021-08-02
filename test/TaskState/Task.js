import { staticEvent } from './TaskEvent.js';
import { createTaskStore } from './TaskState.js';
export class Task {
    _belongTo = null; // 当有 TaskGroup 时，指向 Group
    constructor(originData, spiderUUID) {
        this.$EventHub = new EventHub(staticEvent, this);

        // 由 store 验证相关的正确性
        this.$store = createTaskStore({ spiderUUID, originData });
    }

    // Plugin 的汇报口
    $commit(type, ...payload) {
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
        this.$off('*');
        this.$commit('destroy'); // 通知外部，该 Task 被销毁
    }
    get [Symbol.toStringTag]() {
        return 'Task';
    }
}
