import { from, of, pipe } from "rxjs";
import { concatMap, map, mergeMap, skipWhile, switchMap } from "rxjs/operators";
import Task from "./Task.js";
import { v5 as uuidv5 } from "uuid";
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
                    concatMap((task) => {
                        let $source = of(task);
                        let result = task.$checkRepeat(markUUID) ? $source : $source.pipe(plugin);
                        return result;
                    }),
                    map((task) => {
                        task.$commit("Mark", markUUID);
                        return task;
                    })
                );
            }

            return col;
        }, []);
        this._pluginsUUID = this._createUUID(JSON.stringify(UUIDCollection)); // 作为整条流水线的 UUID 证明
        this.pipeline = pipe(...pipelineArray);
    }
    apply(sourceArray) {
        console.log("开始流", sourceArray);
        return from(sourceArray)
            .pipe(
                skipWhile((message) => {
                    // 跳过已经完成的项目
                    if (message._complete && message._static === "complete" && task._completeUUID === this._pluginsUUID) {
                        return true;
                    } else {
                        message._complete = false;
                        message._completeUUID = "";
                        return false;
                    }
                }),
                map((message, index) => {
                    const task = new Task(message, index);
                    this._tasks.push(task);
                    return task;
                }),
                this.pipeline
            )
            .subscribe({
                complete(task) {
                    // console.log(task);
                    // task.$commit("complete", this._pluginsUUID);
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
