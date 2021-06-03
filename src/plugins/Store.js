import { prepareZangodb } from "./Store/zangodb.js";
import { getInfo as getStore, setInfo$ } from "./Store/Information.js";
import { zangodb as zango } from "./Store/zangodb.js";
const setStore = (options) => ($source) => {
    let { name = new Date() } = options || {};

    let db = new zango.Db("mydb", [name]);
    let STORE = db.collection(name);
    return $source.pipe(prepareZangodb, setInfo$({ STORE }));
};
const Store = { setStore, getStore };
export { Store };
