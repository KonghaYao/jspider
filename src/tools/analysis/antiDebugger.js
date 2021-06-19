// 解决无限debugger的一种方式
export function antiDebugger() {
    if (!Function.prototype.$constructor) {
        // 对 Function 构造函数外包一层
        Function.prototype.$constructor = Function.prototype.constructor;
        Function.prototype.constructor = function () {
            if (arguments && typeof arguments[0] === "string") {
                if ("debugger" === arguments[0]) {
                    return;
                }
            }
            return Function.prototype.$constructor.apply(this, arguments);
        };
    }
}
