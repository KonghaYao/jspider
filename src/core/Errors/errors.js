// 在 JSpider 系统中的流发生了错误
export class FlowError extends Error {
    constructor(message) {
        super(message);
        this.name = "FlowError";
    }
}

// Plugin main 函数发生了错误
export class PluginError extends Error {
    constructor(message) {
        super(message);
        this.name = "PluginError";
    }
}

// 重试的时候发生了错误
export class RetryError extends Error {
    constructor(message) {
        super(message);
        this.name = "FlowError";
    }
}
export class TaskError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskError";
    }
}
