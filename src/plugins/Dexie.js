import { init } from "./Dexie/Dexie.js";
import { putData, getData } from "./Dexie/data.js";

import { from } from "rxjs";
import { delayWhen } from "rxjs/operators";
// FIXME 未进行 Plugin 化
const setStore = (options) => ($source) => {
    // 初始化配置
    const { dbName = "JSpider" } = options || {};
    return $source.pipe(
        delayWhen((task) => {
            task.$commit("complete", task._mainUUID);
            const Information = task.$output();
            Information._isABackup = true;

            return from(putData(dbName, Information));
        })
    );
};

export { getData, setStore, init };
