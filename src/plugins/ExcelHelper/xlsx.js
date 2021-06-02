import { load$ } from "../../tools/loader.js";
import { delayWhen } from "rxjs/operators";
let XLSX;
const prepareXLSX = delayWhen(() => {
    return load$("xlsx", function () {
        XLSX = window.XLSX;
    });
});
// 导出模块供 plugins 内部调用
// 浏览器中是异步导入模块，而兼容平台时需要模块导入机制。
export { XLSX as default, prepareXLSX };
