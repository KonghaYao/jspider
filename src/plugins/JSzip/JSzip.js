let JSzip;
import { $load } from "../../tools/loader/loader.js";
function init() {
    return $load("jszip").then((res) => {
        JSzip = window.JSzip;
    });
}

export { JSzip, init };
export default JSzip;
