import { match } from 'path-to-regexp';
import { Request, Response } from './src/Server.js';
import { Route, RouteMap } from './src/Route.js';
function createRegexp(path) {
    return match(path, { decode: decodeURIComponent });
}
export * from './ajax/index.js';
export class FakeServer {
    constructor({ Routers, plugins = [] }) {
        this.addRoutes(Routers);
        if (plugins.length) this.#initAjaxProxy(plugins);
    }
    #RouteMap = new RouteMap();
    #initAjaxProxy(plugins) {
        plugins.forEach((func) => func({ proxy: this.getServerResult.bind(this) }));
    }

    addRoutes(Routers) {
        Routers.forEach((item) => {
            item.matcher = createRegexp(item.path);
            const route = new Route(item);
            this.#RouteMap.addRoute(route);
        });
    }
    // 传入的参数为 fetch 的传入参数
    // 返回的数据为 Response
    getServerResult(path, options = {}) {
        const req = new Request(path, options);
        const res = new Response(path, options);
        const route = this.#RouteMap.matchRoute(req);
        // target 为一个 router
        if (route) {
            route.request(req, res);
            return res;
        } else {
            return null;
        }
    }
}
