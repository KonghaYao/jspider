/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:52:50
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 19:06:40
 */

// 每一个 Counter 代表对一个对象的报告的记录
class Counter {
    constructor(name) {
        Object.assign(this, {
            name,
            error: 0,
            success: 0,
            failed: 0,
            normal:0,
            total:0,
            logger: [],
        });
    }
    record(Logger) {
        const type = Logger.type
        (this?.[type]||this.normal)++;
        this.total++
        this.logger.push(Logger)
    }

}

// 所有报告记录的中心
class CounterCenter {
    constructor() {}
    register(name) {
        this[name] = new Counter(name);
    }
    global = new Counter("global");
    reportLogger(Logger) {
        const counter = this?.[Logger.scope] || this.global;
        counter.record(Logger);
    }
}
export const MessageCounter = new CounterCenter();
