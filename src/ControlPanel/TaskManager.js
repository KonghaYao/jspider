import { Task } from '../TaskSystem/Task';

function createTaskViewModel(task) {
    // TODO 建立 Proxy 对象提供监控
    return new Proxy(task, {});
}

// ! 用于维护全局 Task 数据的中心
export class TaskManager {
    #Tasks = new Map(); // 用于维护所有的 Task
    viewModel = []; // 这是放置所有的外部 Mirror 需要监听的对象

    // 直接代理全局的 task 创建事件，TaskGroup 是不管的，因为 TaskGroup 具有编程场景临时性，一般在 plugin 阶段自己销毁
    // 这好比村长只管理村民人数和状况，但是不管理村民的组织
    createTask(data, pipelineUUID) {
        const task = new Task(data, pipelineUUID);
        this.#Tasks.set(task._uuid, task);
        task.$on({
            // 监听事件，并更新响应的 viewModel
            destroy() {
                this.#Tasks.delete(this._uuid); // this 绑定的是 task
            },
        });

        const model = createTaskViewModel(task);
        this.viewModel.push(model);
        return task;
    }
}
