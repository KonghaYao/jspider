import { from } from "rxjs";
import { map, filter } from "rxjs/operators";
import Task from "./Task.js";

// JSpider 内部不进行 Error 相关的处理
// 因为 Error 是在 Plugins 内部处理的，不通过 JSpider
class JSpider {
    constructor(...plugins) {
        this.plugins = plugins;
    }
    _aboutElementIndex = -1; // 标志中断时的元素 Index
    _status = "normal";
    _tasks = [];

    apply(sourceArray) {
        return from(sourceArray)
            .pipe(
                map((message, index) => {
                    const task = new Task(message, index);
                    this._tasks.push(task);
                    return task;
                }),
                ...this.plugins
            )
            .subscribe({
                complete() {
                    console.log("爬虫完成");
                },
            });
    }

    setting() {
        // 对 JSpider 进行设置
    }
    restart() {
        // 重新获取并覆盖数据
    }
    retry() {
        // 对发生错误或失败的 Task 进行重试
    }
    about() {
        // 中断事件流
    }
    report(director) {
        // 根据 director 返回信息
    }
}

export { JSpider as default };
