// 事件统计中心
const counter = {
    error: 0,
    retry: 0,
    failed: 0,
    success: 0,
    Logger: {
        // sourceFlag :[logger]
    },
};
console.log(counter);

export class Logger {
    constructor(scope, sourceFlag, content) {}
}

// 数据的收发 API
const consoleMap = {
    /**
     * log 函数
     * @param {string} scope 用于标记相应的记录等级
     * @param {string} sourceFlag
     * @param {*} content
     */
    log(scope, sourceFlag, content) {},
    error() {},
    info() {},
};

const console = new Proxy(window.console, {
    get(target, what) {
        return consoleMap?.[what] || target?.[what];
    },
});

export { console };
