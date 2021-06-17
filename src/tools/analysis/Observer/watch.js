const handle = { get, set };
const DEFAULT = (key, value) => value;

/**
 * 主函数
 * @date 2020-09-17
 * @description 这个是主要的函数，下面的是用于代理的 get 和 set 函数
 * @param {Object} obj 被代理对象
 * @returns {Proxy} 返回代理的对象
 */
function watch(obj) {
    let type = Object.prototype.toString.call(obj).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
    if ((type === "Object" || type === "Array") && obj) {
        let arr = Object.entries(obj);
        arr.forEach(([key, value]) => {
            obj[key] = watch(value);
        });
        obj.GETTER = { DEFAULT };
        obj.SETTER = { DEFAULT };
        let proxy = new Proxy(obj, handle);
        console.log("%c 代理对象完成", "color:orange");
        return proxy;
    } else {
        return obj;
    }
}

/**
 * get 函数
 * @date 2020-09-17
 * @param {Object} target 被代理对象
 * @param {any} key 输入的键
 * @returns {any} 返回需要返回的值
 */
function get(target, key) {
    if (key === "length" && target instanceof Array) {
        return target[key];
    }
    if (target.GETTER.hasOwnProperty(key)) {
        return target.GETTER[key].apply(this, [target[key]]);
    } else if (target.GETTER.hasOwnProperty("DEFAULT")) {
        return target.GETTER.DEFAULT.apply(this, [key, target[key]]);
    } else {
        return target[key];
    }
}

/**
 * set 函数
 * @date 2020-09-17
 * @param {Object} target 被代理对象
 * @param {any} key 输入的键
 * @param {any} value 输入的值
 * @returns {Boolean} 返回是否成功替换
 */
function set(target, key, value) {
    if (key === "length" && target instanceof Array) {
        target[key] = value;
        return true;
    }
    if ((key === "GETTER" || key === "SETTER") && typeof value !== "object") {
        console.log("%c 请对对象属性赋值", "color:red");
        return false;
    }
    if (target.SETTER.hasOwnProperty(key)) {
        let last = target.SETTER[key].apply(this, [target[key], value]);
        if (last !== undefined) {
            target[key] = watch(last);
        }
        return true;
    } else if (target.SETTER.hasOwnProperty("DEFAULT")) {
        let last = target.SETTER.DEFAULT.apply(this, [target[key], value]);
        if (last !== undefined) {
            target[key] = watch(last);
            return true;
        } else {
            return false;
        }
    } else {
        target[key] = value;
        return true;
    }
}

export { watch };
