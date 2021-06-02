// 使用下面的 名称可以直接导入相应的包
// 同时，如果需要导入其他数据的时候也可以使用
import scriptMap from "./loader/scriptStore.json";
import loaderFunction from "./loader/loaderFunction.js";
const RootMap = {
    jsdelivr: "https://cdn.jsdelivr.net/",
};
let store = {
    _getURL(Module) {
        // name 可以直接是 URL ，构建 URL 的对象或者是保存过的库的名称
        const isExisted = this.hasOwnProperty(Module);
        const type = typeof Module;
        if (type === "string") return [{ url: isExisted ? scriptMap[Module] : Module, type: "script" }];

        let target;
        if (type === "object") target = Module;
        return target instanceof Array ? target.map((el) => this._generateURLObject(el)) : [this._generateURLObject(target)]; // 返回值统一为数组
    },
    _generateURLObject({ root, repo, path, type = "script" }) {
        return { url: RootMap[root] || root + repo + path, type };
    },
};
Object.assign(store, scriptMap);

function $load(Module) {
    let urlArray = store._getURL(Module);
    return Promise.all(
        urlArray.map(({ url, type }) => {
            console.log(url);
            if (loaderFunction.hasOwnProperty(type)) {
                return loaderFunction[type](url);
            }
            return null;
        })
    );
}
import { from } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
const cache = {};
function load$(Module, callback) {
    const ModuleKey = JSON.stringify(Module);
    let isDoing = cache[ModuleKey] || false;
    return from([1]).pipe(
        mergeMap(() => {
            if (!isDoing) {
                cache[ModuleKey] = $load(Module);
            }
            return from(cache[ModuleKey]);
        }),
        map((res) => {
            if (callback) {
                return callback(res);
            }
            return res;
        })
    );
}
export { $load as default, load$ };
