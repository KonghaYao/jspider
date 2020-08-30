let handle = {
    get(target, key) {
        if (key === "length" && target instanceof Array) {
            return target[key];
        }
        if (target.GETTER.hasOwnProperty(key)) {
            return target.GETTER[key].apply(this, [target[key]]);
        } else {
            return target[key];
        }
    },
    set(target, key, value) {
        if (key === "length" && target instanceof Array) {
            target[key] = value;
            return true;
        }
        if ((key === "GETTER" || key === "SETTER") && typeof value !== "object") {
            console.log("%c 请对对象属性赋值", "color:red");
            return false;
        }
        if (target.SETTER.hasOwnProperty(key)) {
            let last = target.SETTER[key].apply(this, [target[key]]);
            if (last !== undefined) {
                target[key] = watch(last, this);
            }
            return true;
        } else if (target.SETTER.hasOwnProperty("DEFAULT")) {
            let last = target.SETTER.DEFAULT.apply(this, [key, target[key]]);
            if (last !== undefined) {
                target[key] = watch(last, this);
            }
            return true;
        } else {
            target[key] = value;
            return true;
        }
    },
};
function watch(obj) {
    let type = Object.prototype.toString.call(obj).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
    if ((type === "Object" || type === "Array") && obj) {
        let arr = Object.entries(obj);
        arr.forEach(([key, value]) => {
            obj[key] = watch(value);
        });
        obj.GETTER = {
            DEFAULT: (key, value) => value,
        };
        obj.SETTER = {
            DEFAULT: (key, value) => value,
        };
        let proxy = new Proxy(obj, handle);

        return proxy;
    } else {
        return obj;
    }
}

let a = {
    aa: [0, 1, 2, 3],
    cc: {
        name: [4, 5],
    },
    dd: null,
    name: "1233",
};
a = watch(a);
a.aa.push(1);
