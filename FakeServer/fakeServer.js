import { pathToRegexp } from 'path-to-regexp/dist.es2015';
import { Request, Response } from './src/Server.js';
import { Route, RouteMap } from './src/Route.js';
function createRegexp(path, config = {}) {
    return pathToRegexp(path, [], config);
}

export class FakeServer {
    constructor(Routers, {} = {}) {
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
