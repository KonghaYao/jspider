import { load$ } from "../../tools/loader.js";
import { delayWhen } from "rxjs/operators";
let zangodb, STORE;
const prepareZangodb = delayWhen(() => {
    return load$("zangodb", function () {
        // 回调函数，iife 导入需要回调
        zangodb = window.zangodb;
    });
});
// 导出模块供 plugins 内部调用
// 浏览器中是异步导入模块，而兼容平台时需要模块导入机制。
export { zangodb, prepareZangodb, STORE };
export default zangodb;
