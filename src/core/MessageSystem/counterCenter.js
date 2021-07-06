/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:52:50
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-07-06 14:54:26
 */

// 每一个 Counter 代表对一个对象的报告的记录
class Counter {
    constructor(name) {
        Object.assign(this, {
            name,
            error: 0,
            success: 0,
            failed: 0,
            normal: 0,
            total: 0,
            logger: [],
        });
    }
    record(Logger) {
        this.hasOwnProperty(Logger.type) ? this[Logger.type]++ : this.normal++;
        this.total++;
        this.logger.push(Logger);
    }
}

// 所有报告记录的中心
export const CounterCenter = {
    register(name) {
        this[name] = new Counter(name);
    },
    global: new Counter('global'),
    reportLogger(Logger) {
        const counter = this?.[Logger.scope] || this.global;
        counter.record(Logger);
    },
};
