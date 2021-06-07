import { m as mergeMap } from './mergeMap-1cf10555.js';
import { o as of } from './of-0c892e58.js';

// 用于初始化插件
function initPlugins(...plugins) {
    return Promise.all(
        plugins.reduce((col, cur) => {
            if ("init" in cur && cur.init instanceof Function) {
                col.push(cur.init());
            }
            return col;
        }, [])
    );
}

const createPlugin = function (func, options) {
    let { canSkip = false } = options || {};
    const definedFunction = (source) => source.pipe(mergeMap((task) => of(func(task))));
    definedFunction.$canSkip = canSkip; // 阻止 JSpider 内部跳过
    return definedFunction;
};

var pluginTools = /*#__PURE__*/Object.freeze({
    __proto__: null,
    initPlugins: initPlugins,
    createPlugin: createPlugin
});

export { createPlugin as c, initPlugins as i, pluginTools as p };
