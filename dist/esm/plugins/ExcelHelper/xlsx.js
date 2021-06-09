import { $load } from '../../tools/loader/loader.js';
import '../../tools/loader/scriptStore.js';
import '../../tools/loader/loaderFunction.js';

let XLSX;
function init() {
    return $load("xlsx").then(() => {
        XLSX = window.XLSX;
    });
}
var XLSX$1 = XLSX;

export default XLSX$1;
export { XLSX, init };
