/* eslint-disable no-extend-native */
// 解决无限debugger的一种方式
// 对于无限 debugger 不一定有效
// TODO 验证有效性
export function $antiDebugger() {
    if (!Function.prototype.$constructor) {
        // 对 Function 构造函数外包一层
        Function.prototype.$constructor = Function.prototype.constructor;
        Function.prototype.constructor = function (...args) {
            if (args && typeof args[0] === "string") {
                if (args[0] === "debugger") {
                    return;
                }
            }
            return Function.prototype.$constructor.apply(this, args);
        };
    }
}
