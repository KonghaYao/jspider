import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { pathToRegexp } from 'path-to-regexp';
import { parseURL } from './parseURL.js';
function normalizeRouters(Routers) {
    return Object.entries(Routers);
}
function createRegexp(path, config = {}) {
    return pathToRegexp(path, [], config);
}
class Response {
    constructor(path, options = {}) {}
    send() {}
}

// 每一个 Route 只有一个 main 函数进行数据的返回
class Route {
    constructor(pathRegexp, cb) {
        this.query = cb;
    }
    use(plugin) {}
}
class Router {
    constructor(Routers) {
        this.#RouterMap = new Map(normalizeRouters(Routers));
    }
    #RouterMap;
    #RouteMatchers = [];
    addRoute(path, mainCallback) {
        const route = new Route(path, mainCallback);
        const pathRegexp = createRegexp(path);
        this.#RouterMap.set(pathRegexp, route);
        this.#RouteMatchers.push(pathRegexp);
        return route;
    }
    receiveMessage(path, options = {}) {
        const req = parseURL(path);
        const res = new Response(path, options);
        let target;
        this.#RouteMatchers.some((i) => {
            if (path.match(i)) {
                target = this.#RouterMap.get(i);
                return true;
            }
            return false;
        });

        if (target instanceof Router) {
            return target.query(req, res);
        } else {
        }
    }
}
