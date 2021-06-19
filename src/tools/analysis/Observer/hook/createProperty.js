// 私有属性的调用值
const private = Symbol("hook property");

// 向私有属性进行函数事件挂载
function $on(eventName, callback) {
    try {
        this[private][eventName].push(callback);
    } catch (e) {
        throw "事件挂载失败";
    }
}

// 如果一个事件同时挂载了两次，需要遍历全部元素才能判断
function $off(eventName, callback) {
    try {
        this[private][eventName] = this[private][eventName].filter((element) => element !== callback);
    } catch (e) {
        throw "事件删除失败";
    }
}

export function createProperty(func) {
    // 布置前置函数和后置函数
    func[private] = {
        before: [],
        after: [],
    };

    func.$on = $on;
    func.$off = $off;
}
export { private };
