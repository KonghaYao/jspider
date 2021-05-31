import { merge } from "lodash-es";

class TaskError {
    constructor(message) {
        this.err = message;
        this.errTime = new Date();
    }
}
// 这种写法借鉴了 Vue 的组件写法，所以叫做 components
// 不能使用 $作为前缀
// this 总是指向 TaskWrapper 实例，而不是这个对象
// this.data 指向 data 内的信息
export default {
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
            this.data.url = message;
        },
        Object(message) {
            // lodash 的 merge 深度地将后面的对象覆盖到 Task 对象
            merge(this.data, message);
        },
    },
    commit: {
        // 对应 $commit(status,payload) 函数
        // 如果不返回视为更改状态
        // 只有返回 false 将不会更改状态, 是 false 哦

        processing(payload) {
            // processing 可以获取到数据, 表示从中取出数据去操作
            switch (this.$status) {
                case "success":
                case "processing":
                    return false;
                default:
                    return this.data;
            }
        },
        stateChange(payload) {
            this.data = payload;
        },
        about(payload) {},
        retry(payload) {
            // 不能重试重试，需要先 about 或者 error
            if (this.$status === "retry") return false;
            return this.data;
        },

        success(payload) {
            this.$result = payload;
        },
        error(payload) {
            this.$errorList.push(new TaskError(payload));
        },
    },
};
