// 每一个 Route 只有一个 main 函数进行数据的返回
export class Route {
    constructor({ matcher, name, path, callback, redirect = '' }) {
        Object.assign(this, {
            matcher,
            name,
            path,
            callback,
            redirect,
        });
    }
    async request(req, res) {
        const response = await this.callback(req, res);
        if (response instanceof Response) return response;
        return res;
    }
}

export class RouteMap extends Map {
    constructor(...args) {
        super(...args);
    }
    #RouteMatchers = [];
    addRoute(Route) {
        this.#RouteMatchers.push(Route.matcher);
        return this.set(Route.matcher, Route);
    }
    matchRoute(path) {
        let target;
        this.#RouteMatchers.some((reg) => {
            let result = path.match(reg);
            if (result) {
                target = this.#RouteMap.get(reg);
                return true;
            }
            return false;
        });
        return target;
    }
}
