/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:23
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 15:58:08
 */
import { TaskError } from "../Errors/errors.js";
import { Task } from "./Task.js";

// Task 的结构借鉴于 Vue 的组件写法
const components = {
    data: () => ({}),
    commit: {
        start(pluginUUID) {
            this._marks[pluginUUID] = null;

            return this._result || this.originData.map((task) => task.$commit("start", pluginUUID));
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
            this.originData.forEach((task) => task.$commit("success", payload, UUID, false));
            return true;
        },
        error(payload) {
            this._errorList.push(new TaskError(payload));
            this.originData.forEach((task) => task.$commit("error", payload));
            return true;
        },
    },
};
const { commit } = components;
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
            throw new TaskError(`commit 状态错误${this._index}`);
        }
    }

    $checkRepeat() {
        return true;
    }

    $break() {
        return this.originData;
    }
}
