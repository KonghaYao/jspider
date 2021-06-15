import { $load } from '../../tools/loader/loader.js';
import '../../tools/loader/scriptStore.js';
import '../../tools/loader/loaderFunction.js';

let JSZip;
function init() {
    return $load("jszip").then((res) => {
        JSZip = window.JSZip;
    });
}
var JSZip$1 = JSZip;

export default JSZip$1;
export { JSZip, init };
