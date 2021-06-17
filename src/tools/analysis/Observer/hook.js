// 默认的代理选项
const handleDefault = {
    get(target, key) {
        return target[key];
    },
    set(target, key, value) {
        target[key] = value;
        return target;
    },
};

/**
 * hook 主函数
 * @date 2020-09-17
 * @param {function} func 被代理的函数
 * @param {Boolean} async=false 是否需要返回值为 Promise
 * @returns {Proxy} 返回 Proxy 代理对象
 */
function hook(func, async = false) {
    // 布置前置函数和后置函数
    func.Func = [];
    func.afterFunc = [];

    // 代理函数
    let handle = handleDefault;
    handle.apply = async ? asyncFunc : normalFunc;
    let fake = new Proxy(func, handle);

    return fake;
}

//==================== apply 属性 =====================//
//
// 函数代理的 apply
/**
 * 非异步函数代理 apply
 * @date 2020-09-17
 * @param {function} target 代理对象
 * @param {any} thisArg 执行上下文
 * @param {Array} args 执行参数
 */
function normalFunc(target, thisArg, args) {
    let res = [...target.Func].reduce((a, b) => {
        return b.apply(thisArg, [a]);
    }, args);
    let mid = target.apply(thisArg, res || args);

    return target.afterFunc.reduce((a, b) => {
        return b.call(thisArg, a);
    }, mid);
}

/**
 * 异步函数代理 apply
 * @date 2020-09-17
 * @param {function} target 代理对象
 * @param {any} thisArg 执行上下文
 * @param {Array} args 执行参数
 */
async function asyncFunc(target, thisArg, args) {
    let result = target.Func.reduce((a, b) => {
        return a.then((res) => b.apply(thisArg, [res]));
    }, Promise.resolve(args));

    return [target, ...target.afterFunc].reduce((a, b) => {
        return a.then((res) => b.call(thisArg, res));
    }, Promise.resolve(result || args));
}

export { hook };
