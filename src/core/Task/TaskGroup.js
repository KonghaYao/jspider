// Task 的结构借鉴于 Vue 的组件写法
const components = {
    data: () => ({}),
    commit: {
        start(pluginUUID) {
            return this.originData.map((task) => task.$commit("start", pluginUUID));
        },
        complete(UUID) {
            this.originData.forEach((task) => task.$commit("complete", UUID));
        },
        success(payload, UUID) {
            this.originData.forEach((task) => task.$commit("success", payload, UUID, false));
        },
        error(payload) {
            this.originData.forEach((task) => task.$commit("error", payload));
        },
    },
};
const { commit } = components;

export class TaskGroup {
    constructor(...array) {
        this.originData = new Array(...array);
    }
    $commit(status, ...payload) {
        if (commit[status] instanceof Function) {
            const returnData = commit[status].apply(this, payload);
            if (returnData !== false) {
                this._status = status;
                this._updatedAt = new Date();
                return returnData;
            }
        } else {
            throw new Error("commit 状态错误" + this._index);
        }
    }
    $checkRepeat() {
        return true;
    }
    $break() {
        return this.originData;
    }
}
