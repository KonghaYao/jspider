import { init } from "./Dexie/Dexie.js";
import { putData, getData } from "./Dexie/data.js";

import { from } from "rxjs";
import { delayWhen } from "rxjs/operators";

const setStore = (options) => ($source) => {
    // 初始化配置
    let { dbName = "JSpider" } = options || {};
    return $source.pipe(
        delayWhen((task) => {
            task.$commit("complete", task._mainUUID);
            let Information = task.$output();
            Information._isABackup = true;

            return from(putData(dbName, Information));
        })
    );
};

export { getData, setStore, init };
