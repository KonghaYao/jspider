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
// 自定义插件
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";

const createPlugin = function (func, options) {
    let { canSkip = false } = options || {};
    const definedFunction = (source) => source.pipe(mergeMap((task) => of(func(task))));
    definedFunction.$canSkip = canSkip; // 阻止 JSpider 内部跳过
    return definedFunction;
};
export { initPlugins, createPlugin };
