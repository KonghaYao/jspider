/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:52:50
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 17:01:42
 */
class Counter {
    constructor(name) {
        Object.assign(this, {
            name,
            error: 0,
            success: 0,
            failed: 0,
            logger: [],
        });
    }
    error() {}
}
class CounterCenter {
    constructor() {}
    register(name) {
        this[name] = new Counter(name);
    }
}
export const Reporter = new CounterCenter();
