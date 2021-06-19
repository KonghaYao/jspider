/**
 * 非异步函数代理 apply
 * @date 2020-09-17
 * @param {function} target 代理对象
 * @param {any} thisArg 执行上下文
 * @param {Array} args 执行参数
 */
import { private } from "./hook/createProperty.js";
export function syncApply(target, thisArg, args) {
    const { before, after } = target[private];
    return [...before, target, ...after].reduce((a, b) => {
        return b.call(thisArg, a);
    }, args);
}
