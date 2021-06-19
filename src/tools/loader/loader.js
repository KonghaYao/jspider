// 使用下面的 名称可以直接导入相应的包
// 同时，如果需要导入其他数据的时候也可以使用
import { loaderFunction } from "./loaderFunction.js";
import scriptMap from "./scriptStore.js";
import { jsdelivr } from "./jsDelivr.js";
const URLTest = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
class ImportURL {
    url = "";
    type = "script"; //引入方式 script esm css
    path = "";
    version = "";
    way = "npm";
    constructor(Module) {
        if (typeof Module == "string") {
            if (URLTest.test(Module)) {
                //字符串 URL
                this.URL(Module);
            } else {
                //字符串表示 npm 中的包名
                scriptMap.hasOwnProperty(Module)
                    ? (this.url = scriptMap[Module])
                    : this.jsdelivr({
                          name: Module,
                      });
            }
        } else {
            // object 形式的
            this.jsdelivr(Module);
        }
    }
    URL(urlString) {
        this.url = urlString;
    }
    jsdelivr({ name, way = "npm", path = "", version = "", type }) {
        this.path = path;
        this.version = version;
        this.way = way;
        this.type = type;
        this.url = jsdelivr(name, { version, store: way, path });
    }
    async getURL() {
        return loaderFunction[this.type || "script"](this.url);
    }
}
/**
 * $load 外部暴露的接口
 * @date 2021-06-19
 * @param {String|Object} Module :{}
 * @param {Object} options
 * @returns {Promise}
 */
import { type } from "../../utils/type.js";
export function $load(Module) {
    if (type(Module) === "array") {
        return Promise.all(Module.map((i) => new ImportURL(i).getURL()));
    } else {
        return new ImportURL(Module).getURL();
    }
}
