function searchWindow(reg, max = 5) {
    if (max < 2) {
        console.log("深度不够");
    }
    if (!reg instanceof RegExp && reg instanceof String) {
        reg = new RegExp(reg);
    }
    let all = Object.entries(Globals());
    return Object.fromEntries(searchBase(all, reg, max));
}

function searchObj(obj, reg, max = 100) {
    return Object.fromEntries(searchBase(Object.entries(obj), reg, max));
}

function Globals() {
    //创建一个iframe来辨别window下的原始元素
    let el = document.createElement("iframe");
    el.style.display = "none";
    document.body.appendChild(el);
    let iframe = el.contentWindow;
    el.remove();
    //比较两个对象差异
    let diff = Object.entries(window).filter((prop) => !(prop[0] in iframe));
    return Object.fromEntries(diff);
}

function searchBase(arr, name, deep = 5) {
    if (!deep) {
        console.log("%c 触及低端不再下探", "color:green");
        return [];
    }
    deep -= 1;
    return arr.reduce((all, i) => {
        let [key, value] = i;
        //判断 key 中是否有符合项
        if (name.test(key)) {
            return [...all, i];
        } else {
            //判断数据类型 分类操作
            let type = Object.prototype.toString.call(value).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
            switch (type) {
                //字符串和函数只需要对文字部分分析就可以了
                case "String":
                    return name.test(value) ? [...all, i] : all;
                case "Function":
                    return name.test(value.name) ? [...all, i] : all;
                //数组 和 对象分开
                case "Array":
                    var dd = searchBase(Object.entries(value), name, deep).reduce((a, b) => {
                        let num = parseInt(b[0]) - a.length;
                        [...Array(num)].forEach(() => a.push("***"));
                        return [...a, b[1]];
                    }, []);
                    return dd.length ? [...all, [key, dd]] : all;
                case "Object":
                    var bb = Object.fromEntries(searchBase(Object.entries(value), name, deep));
                    return Object.keys(bb).length === 0 ? all : [...all, [key, bb]];
                //跳过其他类型
                default:
                    return all;
            }
        }
    }, []);
}

export default { Globals, searchObj, searchWindow };
