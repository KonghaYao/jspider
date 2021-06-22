import { from, pipe } from "rxjs";
import { map, skipWhile, tap } from "rxjs/operators";
import Task from "./Task.js";
import { v5 as uuidv5 } from "uuid";
import consola from "consola";
// JSpider 内部不进行 Error 相关的处理
// 因为 Error 是在 Plugins 内部处理的，不通过 JSpider
class JSpider {
    constructor(...plugins) {
        this.plugins = plugins; // 对 plugins 判断

        this._createPipeline();
    }
    marksPath = [];
    plugins = [];
    _aboutElementIndex = -1; // 标志中断时的元素 Index
    _status = "normal";
    _tasks = [];
    _pluginsUUID; //标志走过这一条流程线的 UUID 值
    _createUUID(string) {
        return uuidv5(string, uuidv5.URL);
    }
    _createPipeline() {
        let UUIDCollection = [];
        let pipelineArray = this.plugins.reduce((col, plugin) => {
            // !使用 uuid 作为程序的唯一标识符，这个将用来判断数据是否经过同一个步骤

            let string = plugin.toString();
            let markUUID = this._createUUID(string); // 生成对代码的标志符
            plugin.uuid = markUUID;
            UUIDCollection.push(string);
            if (plugin.$canSkip === false) {
                col.push(plugin);
            } else {
                col.push(
                    function (source) {
                        let result;
                        let $source = source.pipe(tap((task) => (result = task.$checkRepeat(markUUID))));
                        return result ? $source : $source.pipe(plugin);
                    },
                    map((task) => {
                        task.$Mark(markUUID);
                        return task;
                    })
                );
            }

            return col;
        }, []);
        this._pluginsUUID = this._createUUID(JSON.stringify(UUIDCollection)); // 作为整条流水线的 UUID 证明
        consola.start("任务总编号:", this._pluginsUUID);
        this.pipeline = pipe(...pipelineArray);
    }

    apply(sourceArray) {
        return from(sourceArray)
            .pipe(
                map((message) => {
                    const task = new Task(message, this._pluginsUUID);
                    this._tasks.push(task);
                    return task;
                }),
                skipWhile((task) => {
                    // 跳过已经完成的项目
                    if (task._complete && task._status === "complete" && task._completeUUID === this._pluginsUUID) {
                        consola.warn("跳过一个目标");
                        return true;
                    } else {
                        return false;
                    }
                }),

                this.pipeline,
                tap((task) => task.$commit("complete", this._pluginsUUID))
            )
            .subscribe({
                complete() {
                    consola.success("爬虫全部完成");
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
