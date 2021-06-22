import { searchObj } from "./searchObj.js";
import { isRegExp, isString } from "lodash-es";
/**
 * 搜索入口函数
 * @date 2020-09-16
 * @param {Object} obj 被搜索的对象
 * @param {Regexp} regex 搜索使用的正则表达式
 * @param {Number} max=5 最大搜索深度
 * @returns {Object} 返回搜索结果的结构化结果
 */
export function $search(obj, reg) {
    if (!isRegExp(reg) && isString(reg)) {
        reg = new RegExp(reg);
    }
    if (obj instanceof Array) {
        return searchObj(Object.entries({ i: obj }), reg)[0][1];
    }
    if (obj instanceof Object) {
        return Object.fromEntries(searchObj(Object.entries(obj), reg));
    } else {
        throw new Error("不是对象，不能搜索");
    }
}
