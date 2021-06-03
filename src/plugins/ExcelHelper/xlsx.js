let XLSX;
import { $load } from "../../tools/loader.js";
function init() {
    return $load("xlsx").then(() => {
        XLSX = window.XLSX;
    });
}
export { XLSX, init };
export default XLSX;
