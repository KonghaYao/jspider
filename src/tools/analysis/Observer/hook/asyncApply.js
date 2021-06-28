/**
 * 异步函数代理 apply
 * @date 2020-09-17
 * @param {function} target 代理对象
 * @param {any} thisArg 执行上下文
 * @param {Array} args 执行参数
 */
import { Private } from "./createProperty.js";

export async function asyncApply(target, thisArg, args) {
    const { before, after } = target[Private];
    return [...before, target, ...after].reduce(
        (a, b) => a.then((res) => b.call(thisArg, res)),
        Promise.resolve(args)
    );
}
