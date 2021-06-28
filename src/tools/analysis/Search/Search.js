import { searchObj } from "./searchObj.js";
import { isRegExp, isString } from "lodash-es";
/**
 * 描述
 * @date 2021-06-28
 * @param {any} obj
 * @param {any} reg
 * @returns {any}
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
