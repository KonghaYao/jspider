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

//主函数
function Hook(func, async = false) {
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
// 主要采用函数式编程的方式进行函数数组的数据处理
// 平常函数代理的 apply
function normalFunc(target, thisArg, args) {
    let res = [...target.Func].reduce((a, b) => {
        return b.apply(thisArg, [a]);
    }, args);

    let res1 = target.apply(thisArg, res);

    return target.afterFunc.reduce((a, b) => {
        return b.call(thisArg, a);
    }, res1);
}

// 异步的函数代理的 apply
async function asyncFunc(target, thisArg, args) {
    let res = target.Func.reduce((a, b) => {
        return a.then((res) => b.apply(thisArg, [res]));
    }, Promise.resolve(args));

    return [target, ...target.afterFunc].reduce((a, b) => {
        return a.then((res) => b.apply(thisArg, res));
    }, Promise.resolve(res));
}

export default Hook;
