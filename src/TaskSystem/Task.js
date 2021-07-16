import { EventHub } from '../ControlPanel/EventHub';
import { staticEvent } from './StaticEvent';
import { Data } from './Data'; // 属性信息归属于 Data

// 这个 Task 是模板类，如果需要进行业务功能的实现，必须先继承它，然后 super 相应的东西
export class Task extends Data {
    _belongTo = null; // 当有 TaskGroup 时，指向 Group
    constructor(data, spiderUUID) {
        super(data);

        this.$EventHub = new EventHub(staticEvent, this);

        // UUID 信息
        if (!spiderUUID) throw new Error('没有指定的spider UUID');
        this._spiderUUID = spiderUUID;
    }

    // Plugin 的汇报口
    $commit(type, ...payload) {
        const [result] = this.$EventHub.emit(type, ...payload);

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
        return task._spiderUUID === this._spiderUUID && task._uuid === this._uuid;
    }
    $checkRepeat(uuid) {
        return this._progress.has(uuid);
    }
    $destroy() {
        this.$commit('destroy'); // 通知外部，该 Task 被销毁
    }
    get [Symbol.toStringTag]() {
        return 'Task';
    }
}
