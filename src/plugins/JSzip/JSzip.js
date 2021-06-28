import { $load } from "../../tools/loader/loader.js";

let JSZip;
function init() {
    return $load("jszip").then(() => {
        JSZip = window.JSZip;
    });
}

export { JSZip, init };
export default JSZip;
