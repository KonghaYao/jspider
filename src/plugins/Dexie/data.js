import { Dexie } from "./Dexie.js";
const dbCache = {};
function openDB(dbName) {
    console.log(dbCache);
    let db = new Dexie(dbName);
    return db
        .open()
        .catch("NoSuchDatabaseError", (e) => {
            db.close();
            db = new Dexie(dbName);
            db.version(1).stores({
                default: "_index,createdAt",
            });
            return db.open();
        })
        .then((db) => (dbCache[dbName] = db));
}
//获得表数据
async function getData(dbName = "JSpider") {
    if (!dbCache.hasOwnProperty(dbName)) await openDB(dbName);
    return new Promise((resolve, reject) => dbCache[dbName].table("default").toArray(resolve));
}
async function putData(dbName, value) {
    if (!dbCache.hasOwnProperty(dbName)) await openDB(dbName);
    return dbCache[dbName].table("default").put(value, "_index");
}
export { getData, putData };
