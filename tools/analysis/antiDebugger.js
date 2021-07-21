/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:16:29
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-29 16:16:29
 */
/* eslint-disable no-extend-native */

// 解决无限debugger的一种方式
// 对于无限 debugger 不一定有效
// TODO 验证有效性
export function $antiDebugger() {
    if (!Function.prototype.$constructor) {
        // 对 Function 构造函数外包一层
        Function.prototype.$constructor = Function.prototype.constructor;
        Function.prototype.constructor = function (...args) {
            if (args && typeof args[0] === 'string') {
                if (args[0] === 'debugger') {
                    return;
                }
            }
            return Function.prototype.$constructor.apply(this, args);
        };
    }
}
