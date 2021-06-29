/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:16:19
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-29 16:16:19
 */
import { isRegExp, isString } from 'lodash-es';
import { searchObj } from './searchObj.js';
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
    }
    throw new Error('不是对象，不能搜索');
}
