import components from "./components.js";
import type from "../utils/type.js";

// Task 的结构借鉴于 Vue 的组件写法
class Task {
    // 所有的内部方法和属性都是前缀为 $
    $index = 0;
    $status = "free";
    $createdAt = new Date();
    $updatedAt = new Date();
    $errorList = [];
    $result;
    $readyData; // 每个中间件传出的数据
    data = {};

    constructor(message, index) {
        if (index instanceof Number) this.$index = index;
        Object.assign(this.data, components.data());
        this.$formatMessage(message);
    }
    $formatMessage(message) {
        let MessageType = type(message);
        if (components.format[MessageType] instanceof Function) {
            components.format[MessageType].apply(this, [message]);
        } else {
            throw new Error("format 状态错误" + this.$index);
        }
    }
    // 通过 commit 更改 Task 内部的status
    $commit(status, ...payload) {
        if (components.commit[status] instanceof Function) {
            const flag = components.commit[status].apply(this, payload);
            if (flag !== false) {
                this.$status = status;
                this.$updatedAt = new Date();
                return flag;
            }
        } else {
            throw new Error("commit 状态错误" + this.$index);
        }
    }
}
export { Task as default };
