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
    return [...target.Func, target, ...target.afterFunc].reduce((a, b) => {
        return a.then((res) => b.apply(thisArg, [res]));
    }, Promise.resolve(args));
}
function normalFunc(target, thisArg, args) {
    let res = [...target.Func, target].reduce((a, b) => {
        return b.apply(thisArg, [a]);
    }, args);
    return target.afterFunc.reduce((a, b) => {
        return b.call(thisArg, a);
    }, res);
}

function Hook(func, async = false) {
    this.hooks = this.hooks || [];
    func.Func = [];
    func.afterFunc = [];
    let handle = handleDefault;
    handle.apply = async ? asyncFunc : normalFunc;
    let fake = new Proxy(func, handle);
    this.hooks.push(fake);
    return fake;
}

export default Hook;
