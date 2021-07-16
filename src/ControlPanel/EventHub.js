import { fromEventPattern } from 'rxjs';

export class EventHub {
    all = new Map();
    constructor(eventMap = {}, bindThis = null) {
        this.bindThis = bindThis || globalThis;
        this.on(eventMap);
    }
    #on(type, handler) {
        const handlers = this.all.get(type);
        // ! 注意，栈的结构，这里要使用 unshift 将元素插入到头部，这样触发的时候才会最后执行最先声明的函数作为默认函数
        // 栈的结构可以保证 在 destroy 事件的时候，首先定义的 destroy 可以最后执行，保证后面绑定 destroy 事件的函数可以先触发，而在 destroy 的定义函数中可以最后 off('*') 解除事件
        handlers ? handlers.unshift(handler) : this.all.set(type, [handler]);
    }
    on(type, handler) {
        // 函数重载
        if (typeof type === 'string') {
            this.#on(type, handler);
        } else if (type instanceof Object) {
            // 在直接赋值为一个
            Object.entries(type).forEach(([key, value]) => {
                if (value instanceof Array) {
                    value.forEach((item) => this.#on(key, item));
                } else {
                    this.#on(key, value);
                }
            });
        }
    }
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
    // 创建一个 rxjs 流源头
    createSource$(eventName) {
        return fromEventPattern(
            (handle) => this.on(eventName, handle),
            (handle) => this.off(eventName, handle),
        );
    }
}
