/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
// 不可以在原生的 XMLHttpRequest 上直接定义 getter 和 setter，
// 也不可以在 XHR 实例上定义
// 这样的话会导致无法接收到数据
// 但是确认为是 mockjs 内的数据返回就可以直接修改 XHR 实例了

export function defineGetAndSet(XHR) {
    // 将这些 键值对 映射到 $data 属性对象的对应值上去
    const array = ['readyState', 'status', 'response', 'responseText', 'statusText'];
    const auto = array.reduce((col, cur) => {
        col[cur] = {
            get() {
                return this.$data[cur];
            },
            set(state) {
                this.$data[cur] = state;
            },
        };
        return col;
    }, {});
    Object.defineProperties(XHR, Object.assign(auto));
    XHR.getResponseHeader = function (name) {
        return this._responseHeaders[name];
    };
    XHR.getAllResponseHeaders = function () {
        return Object.entries(this._responseHeaders)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    };
}
