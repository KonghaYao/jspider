/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:16:08
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-29 16:16:08
 */
import { difference, pick } from 'lodash-es';
import iframe from './window-default.json';
// iframe 是所有的 window 对象下稳定的属性名
// !若是使用 iframe 标签的属性来得到 window 的自带属性，遇到不能使用 iframe 的网站就会失效
// ! 所以使用了这种方式。

/**
 * 全局变量展示
 * @date 2020-09-17
 * @description 将 window 和 上面引入的 iframe 对象做了比较
 * @return {Object} 返回 window 的属性和对象
 */
export function $GlobalVars() {
    // 通过比较得出window上的变量
    const diff = difference(Object.keys(window), iframe);
    return pick(window, diff);
}
