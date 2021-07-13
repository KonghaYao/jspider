export default {
    // ! 即使这些函数不会被使用，也必须使用注释的方式写下
    stateChange(state) {
        this.state = state;
    },
    // runPipeline() {}, // 这个函数没有必要监听是因为 rxjs 代理了这个事件
    // 'Task:success'(task) {},
    // 'Task:error'(error){}
    // 'Task:complete'(){}
};
