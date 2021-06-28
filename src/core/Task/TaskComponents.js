/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:14
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:07:14
 */
import { merge } from "lodash-es";
import { TaskError } from "./TaskError";

// 这种写法借鉴了 Vue 的组件写法，所以叫做 components
// 不能使用 $作为前缀
// this 总是指向 TaskWrapper 实例，而不是这个对象
// this.originData 指向 data 内的信息
const components = {
    data() {
        return {
            url: {},
            options: {},
            result: null,
        };
    },
    format: {
        // 对创建 Task 时的数据进行格式化
        String(message) {
            this.originData.url = message;
        },
        Object(message) {
            // lodash 的 merge 深度地将后面的对象覆盖到 Task 对象
            // Object 的 format 直接表示对 Task 本身进行赋值
            if (message._isABackup === true) {
                // 检查是否为导出的数据，导出性插件需要提供这个变量
                merge(this, message);
            }
            merge(this.originData, message);
        },
        // 是 Task Group 的类型
        Array(message) {
            this.originData = message;
        },
    },
    commit: {
        // 对应 $commit(status,payload) 函数
        // 如果不返回视为更改状态
        // 只有返回 false 将不会更改状态, 是 false 哦

        start(pluginUUID) {
            this._marks[pluginUUID] = null;
            return this._result || this.originData;
        },
        complete(UUID) {
            this._processUUID = UUID;
            this._complete = true;
            return true;
        },
        success(payload, UUID, saveResult = false) {
            this._marks[UUID] = saveResult ? this._result : true;
            this._result = payload;
            return true;
        },
        error(payload) {
            this._errorList.push(new TaskError(payload));
            return true;
        },
    },
};
export default components;
