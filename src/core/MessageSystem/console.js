/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 19:18:21
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 19:26:00
 */
import { Logger } from "./logger";

// 数据的收发 API
const consoleMap = {
    log(...args) {
        const [type, scope, title] = args;
        if (typeof type === "string" && type[0] == "$" && scope && title) {
            new Logger(...args).print();
        } else {
            window.console.log(...args);
        }
    },
};

// 不排除后面版本需要扩充 API 的情况，所以使用 Proxy 代理的方式继承 console
export const console = new Proxy(window.console, {
    get(target, what) {
        return consoleMap?.[what] || target?.[what];
    },
});
