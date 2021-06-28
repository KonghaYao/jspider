// 使用下面的 名称可以直接导入相应的包
// 同时，如果需要导入其他数据的时候也可以使用
import { loaderFunction } from "./loaderFunction.js";

// 优先使用 scriptMap 中的命名，然后是使用 npm 命名
import scriptMap from "./scriptStore.js";
import { jsdelivr } from "./jsDelivr.js";
/**
 * $load 外部暴露的接口
 * @date 2021-06-19
 * @param {String|Object} Module :{}
 * @returns {Promise}
 */
import { type } from "../../utils/type.js";

const URLTest = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;

/**
 * 根据 name object 获取 url
 * @date 2021-06-28
 * @param {any} {name
 * @param {any} way
 * @param {any} path
 * @param {any} version}
 * @return {any}
 */
function fromName({ name, way, path, version }) {
    if (scriptMap.hasOwnProperty(name)) {
        // 优先使用自带的位置
        return scriptMap[name];
    }
    return jsdelivr(name, { version, store: way, path });
}

const handle = {
    Object({ url = "", name, way = "npm", path = "", version = "", type = "script" }) {
        if (!url) {
            // 没有 url 属性
            const result = fromName({ name, way, path, version });
            if (typeof result === "string") {
                url = result;
            } else {
                // 发现 scriptMap 内部的描述是完整的 $load 可以接收的 array 和 object 类型
                return $load(result);
            }
        }
        return loaderFunction[type](url);
    },
    String(Module) {
        return this.Object({ [URLTest.test(Module) ? "url" : "name"]: Module });
    },
    Array(arr) {
        return Promise.all(arr.map((i) => $load(i)));
    },
};
export async function $load(Module) {
    return handle[type(Module)](Module);
}
