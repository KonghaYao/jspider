let JSZip;
import { $load } from "../../tools/loader/loader.js";
function init() {
    return $load("jszip").then((res) => {
        JSZip = window.JSZip;
    });
}

export { JSZip, init };
export default JSZip;
