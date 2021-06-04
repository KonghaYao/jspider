import { getInfo as getStore, setInfo$ } from "./Store/Information.js";
import { DB, init } from "./Store/zangodb.js";
const setStore = (options) => ($source) => {
    // 初始化配置
    let { name = "default" } = options || {};
    console.warn("您访问的数据库表名为 " + name);
    let STORE = DB(name);
    // 产出流
    return $source.pipe(setInfo$({ STORE }));
};

export { setStore, getStore, init };
