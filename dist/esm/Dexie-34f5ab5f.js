import { init } from './plugins/Dexie/Dexie.js';
import { putData, getData } from './plugins/Dexie/data.js';
import { d as delayWhen } from './delayWhen-ec4378ef.js';
import { f as from } from './mergeMap-1cf10555.js';

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

var Dexie = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getData: getData,
    setStore: setStore,
    init: init
});

export { Dexie as D, setStore as s };
