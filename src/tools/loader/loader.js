// 使用下面的 名称可以直接导入相应的包
// 同时，如果需要导入其他数据的时候也可以使用
import { scriptMap } from "./scriptStore.js";
import { loaderFunction } from "./loaderFunction.js";
const RootMap = {
    jsdelivr: "https://cdn.jsdelivr.net/",
};
let store = {
    scriptMap,
    _getURL(Module) {
        // name 可以直接是 URL ，构建 URL 的对象或者是保存过的库的名称
        let cursor = Module;
        if (typeof Module === "string") {
            const isExisted = scriptMap.hasOwnProperty(Module);
            if (isExisted) cursor = scriptMap[Module]; // 输入为库存 key 值
        }

        if (typeof cursor === "string") return [{ url: cursor, type: "script" }];
        return cursor instanceof Array ? cursor.map((el) => this._generateURLObject(el)) : [this._generateURLObject(cursor)]; // 返回值统一为数组
    },
    _generateURLObject({ root, repo, path, type = "script" }) {
        return { url: (RootMap[root] || root) + repo + path, type };
    },
};

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
export { $load };