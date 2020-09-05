const handleDefault = {
    get(target, key) {
        return target[key];
    },
    set(target, key, value) {
        target[key] = value;
        return target;
    },
};

async function asyncFunc(target, thisArg, args) {
    let res = target.Func.reduce((a, b) => {
        return a.then((res) => b.apply(thisArg, [res]));
    }, Promise.resolve(args));
    return [target, ...target.afterFunc].reduce((a, b) => {
        return a.then((res) => b.apply(thisArg, res));
    }, Promise.resolve(res));
}

function normalFunc(target, thisArg, args) {
    let res = [...target.Func].reduce((a, b) => {
        return b.apply(thisArg, [a]);
    }, args);
    let res1 = target.apply(thisArg, res);
    return target.afterFunc.reduce((a, b) => {
        return b.call(thisArg, a);
    }, res1);
}

function Hook(func, async = false) {
    func.Func = [];
    func.afterFunc = [];
    let handle = handleDefault;
    handle.apply = async ? asyncFunc : normalFunc;
    let fake = new Proxy(func, handle);
    return fake;
}

export default Hook;
