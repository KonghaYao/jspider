import { EventHub } from '../EventCenter/eventHub';
import { staticEvent } from './StaticEvent';
// 属性信息归属于 Data
import { Data } from './Data';

export class Task extends Data {
    _belongTo = null; // 当有 TaskGroup 时，指向 Group
    constructor(data, spiderUUID) {
        super();

        this.#EventHub = new EventHub(staticEvent);

        // UUID 信息
        if (spiderUUID) throw new Error('没有指定的spider UUID');
        this._spiderUUID = spiderUUID;

        this._output = data;
    }
    // Plugin 的汇报口
    $commit(type, ...payload) {
        return this.#EventHub.emit(type, ...payload);
    }

    // 外部系统的监控口
    $on(...args) {
        return this.#EventHub.on(...args);
    }
    $off(...args) {
        return this.#EventHub.off(...args);
    }
    $isSameTask(Task) {
        return Task._spiderUUID === this._spiderUUID && Task._uuid === this._uuid;
    }

    $destroy() {
        this._dataChunk = [];
        this.$off('*');
        this._output = null;

        // 从上级删除本身记录
        if (this._belongTo instanceof Task) this._belongTo.removeLink(this);
        this._belongTo = null;
    }
}
