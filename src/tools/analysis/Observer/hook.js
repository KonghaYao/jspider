/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * hook 主函数
 * @description 通过 hook 函数 监控一个函数的触发
 * @date 2020-09-17
 * @param {function} func 被代理的函数
 * @param {Boolean} async=false 是否需要返回值为 Promise
 * @returns {Proxy} 返回 Proxy 代理对象
 */
import { createProperty } from './hook/createProperty.js';
import { syncApply } from './hook/syncApply.js';
import { asyncApply } from './hook/asyncApply.js';
/**
 *
 * 注意 async 的布尔值
 * 如果 async = false 情况下代理返回 Promise 的函数, before 事件会触发，但是 after 事件中会返回 Promise
 * 因为 类似于 fetch 的函数返回 Promise 结束了它的同步执行，然后执行 after 事件，after 中接收到的是 Promise
 * 如果 async = true 则会将所有的结果转化为一个 Promise
 */

export function $hook(func, async = false) {
    createProperty(func);
    return new Proxy(func, {
        apply: async ? asyncApply : syncApply,
    });
}
