import mitt from "mitt";

// 建立事件分发中心
const core = mitt();
const eventMap = {
    error() {},
    log() {},
};
Object.entries(eventMap).map(([key, value]) => core.on(key, value));

// 事件统计中心
const counter = {
    error: 0,
    retry: 0,
    failed: 0,
    messageStack: [],
};
console.log(counter);

// 数据的收发 API
const consoleMap = {
    log() {},
    error() {},
    info() {},
};

const console = new Proxy(window.console, {
    get(target, what) {
        return consoleMap?.[what] || target?.[what];
    },
});

export { console };
