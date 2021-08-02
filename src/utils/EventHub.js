/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { fromEventPattern } from 'rxjs';
import { memoize } from 'lodash-es';
import { share } from 'rxjs/operators';

/**
 *  EventHub 是一个事件处理中心，用于事件的接收与派发
 */

export class EventHub {
    all = new Map();
    constructor(eventMap = {}, bindThis = null) {
        this.bindThis = bindThis || globalThis;
        this.on(eventMap);

        // createSource$ 创建一个 rxjs 流的源头监听相应的事件
        this.createSource$ = memoize((eventName) => {
            return fromEventPattern(
                (handle) => this.on(eventName, handle),
                (handle) => this.off(eventName, handle),
            ).pipe(share());
        });
    }

    /**
     * #on 是单个事件绑定函数，type 与 handle 函数一一对应
     */
    #on(type, handler) {
        const handlers = this.all.get(type);
        // ! 注意，栈的结构，这里要使用 unshift 将元素插入到头部，这样触发的时候才会最后执行最先声明的函数作为默认函数
        // 栈的结构可以保证 在 destroy 事件的时候，首先定义的 destroy 可以最后执行，保证后面绑定 destroy 事件的函数可以先触发，而在 destroy 的定义函数中可以最后 off('*') 解除事件
        handlers ? handlers.unshift(handler) : this.all.set(type, [handler]);
    }

    /**
     * on 函数重载，第一个参数可以为一个事件绑定对象，
     *    on({eventName: callback })
     *    on({eventName: [callback] })
     *    on(type,handle)
     */
    on(type, handler) {
        // 函数重载
        if (typeof type === 'string') {
            this.#on(type, handler);
        } else if (type instanceof Object) {
            // 在直接赋值为一个
            Object.entries(type).forEach(([key, value]) => {
                if (value instanceof Array) {
                    value.forEach((item) => this.#on(key, item));
                } else if (value instanceof Function) {
                    this.#on(key, value);
                }
            });
        }
    }

    /**
     * off 函数 type 设置为 '*' 时删除所有函数
     */
    off(type, handler) {
        if (type === '*') {
            return this.all.clear();
        } else {
            const handlers = this.all.get(type);
            if (handlers) {
                return handler ? handlers.splice(handlers.indexOf(handler) >>> 0, 1) : this.all.set(type, []);
            }
            return false;
        }
    }
    emit(type, ...eventParams) {
        const handlers = this.all.get(type);
        return handlers
            ? handlers.map((handler) => {
                  return handler.apply(this.bindThis, eventParams);
              })
            : [];
    }
}
