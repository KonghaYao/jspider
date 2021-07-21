/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:16:22
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-29 16:16:22
 */
import getType from '../../../src/utils/type.js';

const TypeMap = {
    RE: '',
    StringFunction(all, key, value, keyValue) {
        if (this.RE.test(`${value}`)) all.push(keyValue);
        return all;
    },

    Array(all, key, value) {
        const arr = searchObj(Object.entries(value), this.RE);

        const Value = arr.reduce((final, [k, v]) => {
            final[parseInt(k)] = v;
            return final;
        }, []);
        if (arr.length) all.push([key, Value]);

        return all;
    },
    Function(all, key, value) {
        const entries = searchObj(Object.entries(value), this.RE);
        if (entries.length) {
            all.push([key, Object.assign(value, Object.fromEntries(entries))]);
        }
        return all;
    },
    Object(all, key, value) {
        const entries = searchObj(Object.entries(value), this.RE);
        if (entries.length) all.push([key, Object.fromEntries(entries)]);

        return all;
    },
};
TypeMap.Number = TypeMap.StringFunction;
TypeMap.String = TypeMap.StringFunction;

/**
 * 描述
 * @date 2021-06-28
 * @param {any} arr
 * @param {any} RE
 * @param {any} keepUnknown=false
 * @return {any}
 */
function searchObj(arr, RE, keepUnknown = false) {
    return arr.reduce((all, keyValue) => {
        const [key, value] = keyValue;
        // 判断 key 中是否有符合项
        if (RE.test(key)) {
            return [...all, keyValue];
        }
        // 判断数据类型 分类操作
        TypeMap.RE = RE;
        const type = getType(value);
        if (TypeMap.hasOwnProperty(type)) {
            return TypeMap[type](all, key, value, keyValue);
        }
        return keepUnknown ? [all, keyValue] : all;
    }, []);
}
export { searchObj };
