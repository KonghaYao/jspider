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
        if (response instanceof Response && response.data) return response;
        return null;
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
    matchRoute(req) {
        const path = req.path;
        let target = null;
        this.#RouteMatchers.some((matcher) => {
            const result = matcher(path);
            if (result) {
                target = this.get(matcher);
                // 传入解析后的 path
                req.pathParsed = result;
                return true;
            }
            return false;
        });
        if (target?.redirect) {
            req.path = target.redirect;
            return this.matchRoute(req);
        }
        return target;
    }
}
