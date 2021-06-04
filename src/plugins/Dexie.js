import { init } from "./Dexie/Dexie.js";
import { putData, getData } from "./Dexie/data.js";
import { delayWhen } from "rxjs/operators";
import { from } from "rxjs";
const setStore = (options) => ($source) => {
    // 初始化配置
    let { dbName = "JSpider" } = options || {};

    return $source.pipe(
        delayWhen((task) => {
            let Information = task.$output();
            return from(putData(dbName, Information));
        })
    );
};

export { getData, setStore, init };
