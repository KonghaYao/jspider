import components from "./components.js";
import type from "../utils/type.js";
import { v4 as uuidv4 } from "uuid";
// Task 的结构借鉴于 Vue 的组件写法
class Task {
    // 所有的内部方法和属性都是前缀为 _
    _index = uuidv4();
    _status = "free";
    _createdAt = new Date();
    _updatedAt = new Date();
    _errorList = [];
    _result; // 每个中间件传出的数据
    data = {}; // 源数据，是由用户传入经过 format 的数据

    constructor(message, index) {
        if (index instanceof Number) this._index = index;
        Object.assign(this.data, components.data());
        this.$formatMessage(message);
    }
    $formatMessage(message) {
        let MessageType = type(message);
        if (components.format[MessageType] instanceof Function) {
            components.format[MessageType].apply(this, [message]);
        } else {
            throw new Error("format 状态错误" + this._index);
        }
    }
    // 通过 commit 更改 Task 内部的status
    $commit(status, ...payload) {
        if (components.commit[status] instanceof Function) {
            const flag = components.commit[status].apply(this, payload);
            if (flag !== false) {
                this._status = status;
                this._updatedAt = new Date();
                return flag;
            }
        } else {
            throw new Error("commit 状态错误" + this._index);
        }
    }
    // 数据导出和导入的接口
    $output() {
        let { _index, _status, _createdAt, _updatedAt, _errorList, _result, data } = this;

        return { _index, _status, _createdAt, _updatedAt, _errorList, _result, data, _isABackup: true };
    }
}
export { Task as default };
