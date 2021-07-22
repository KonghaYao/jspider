import { pathToRegexp } from 'path-to-regexp/dist.es2015';
import { parseURL } from './parseURL.js';

function createRegexp(path, config = {}) {
    return pathToRegexp(path, [], config);
}
class Request {
    constructor(path, options) {
        Object.assign(this, parseURL(path), {
            headers: options.headers,
        });
    }
}
class Response {
    constructor(path, options = {}) {}
    send() {}
    setHeaders() {}
}

// 每一个 Route 只有一个 main 函数进行数据的返回
class Route {
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

class RouteMap extends Map {
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
export class FakeServer {
    constructor(Routers) {
        this.#initRouteMap(Routers);
    }
    #RouteMap = new RouteMap();
    #initRouteMap(Routers) {
        Routers.forEach((item) => {
            item.matcher = createRegexp(path);
            const route = new Route(item);
            this.#RouteMap.addRoute(route);
        });
    }

    getServerResult(path, options = {}) {
        const req = new Request(path, options);
        const res = new Response(path, options);
        const target = this.#RouteMap.matchRoute(path);
        if (target) {
            console.log(target);
            return target.request(req, res);
        } else {
            return null;
        }
    }
}
