import { $load } from "../../tools/loader.js";
let zango, Database;
const init = () =>
    $load("zangodb").then((res) => {
        zango = window.zango;
        Database = new zango.Db("JSpider", {
            default: {
                _index: true,
            },
        });
    });

const DB = (name) => {
    return Database.collection(name);
};
// 导出模块供 plugins 内部调用
// 浏览器中是异步导入模块，而兼容平台时需要模块导入机制。
export { zango, DB, init };
export default zango;
