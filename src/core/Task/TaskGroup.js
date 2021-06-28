import { TaskError } from "./TaskError";

// Task 的结构借鉴于 Vue 的组件写法
const components = {
    data: () => ({}),
    commit: {
        start(pluginUUID) {
            this._marks[pluginUUID] = null;

            return (
                this._result ||
                this.originData.map((task) => task.$commit("start", pluginUUID))
            );
        },
        complete(UUID) {
            this._processUUID = UUID;
            this._complete = true;
            this.originData.forEach((task) => task.$commit("complete", UUID));
            return true;
        },
        success(payload, UUID, saveResult = false) {
            this._marks[UUID] = saveResult ? this._result : true;
            this._result = payload;
            this.originData.forEach((task) =>
                task.$commit("success", payload, UUID, false)
            );
            return true;
        },
        error(payload) {
            this._errorList.push(new TaskError(payload));
            this.originData.forEach((task) => task.$commit("error", payload));
            return true;
        }
    }
};
const { commit } = components;
import { Task } from "./Task.js";
export class TaskGroup extends Task {
    constructor(array, UUID) {
        super(new Array(...array), UUID);
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
