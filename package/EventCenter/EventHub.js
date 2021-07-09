export class EventHub {
    all = null;
    constructor(eventMap = {}, bindThis = null) {
        this.bindThis = bindThis || globalThis;
        this.all = eventMap instanceof Map ? eventMap : new Map(Object.entries(eventMap));
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
                return handler ? handlers.splice(handlers.indexOf(handler) >>> 0, 1) : all.set(type, []);
            }
            return false;
        }
    }
    emit(type, ...eventParams) {
        let handlers = this.all.get(type);
        return handlers
            ? handlers.map((handler) => {
                  return handler.apply(this.bindThis, eventParams);
              })
            : [];
    }
}
