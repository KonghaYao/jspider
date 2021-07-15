import { fromEventPattern } from 'rxjs';

export class EventHub {
    all = null;
    constructor(eventMap = {}, bindThis = null) {
        this.bindThis = bindThis || globalThis;
        this.all =
            eventMap instanceof Map
                ? eventMap
                : new Map(Object.entries(eventMap).map(([key, value]) => [key, [value]]));
    }
    on(type, handler) {
        const handlers = this.all.get(type);
        return handlers ? handlers.push(handler) : this.all.set(type, [handler]);
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
        console.log(type);
        const handlers = this.all.get(type);
        return handlers
            ? handlers.map((handler) => {
                  return handler.apply(this.bindThis, eventParams);
              })
            : [];
    }
    createSource$(eventName) {
        return fromEventPattern(
            (handle) => this.on(eventName, handle),
            (handle) => this.off(eventName, handle),
        );
    }
}
