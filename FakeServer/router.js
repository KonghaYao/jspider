import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { pathToRegexp } from 'path-to-regexp';
function normalizeRouters(Routers) {
    return Object.entries(Routers);
}
function createRegexp(path, config = {}) {
    return pathToRegexp(path, [], config);
}
class Route {
    constructor(path, cb) {}
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
    deleteRouter() {}
    enableRouter() {}
    disableRouter() {}
    receiveMessage(path, message) {}
}
