function Hook(func) {
    this.hooks = this.hooks || [];
    func.Func = [];
    func.afterFunc = [];
    let handle = {
        get(target, key) {
            return target[key];
        },
        set(target, key, value) {
            target[key] = value;
            return target;
        },
        apply: async function (target, thisArg, args) {
            for (let i = 0; i < target.Func.length; i++) {
                args = await target.Func[i].apply(thisArg, [args]);
            }

            let res = await target.apply(thisArg, args);
            let result = [res];

            for (let i = 0; i < target.afterFunc.length; i++) {
                result = await target.afterFunc[i].apply(thisArg, [result]);
            }
            return result[0];
        },
    };

    let fake = new Proxy(func, handle);
    this.hooks.push(fake);
    return fake;
}

export default Hook;
