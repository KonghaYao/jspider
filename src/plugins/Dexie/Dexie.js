let Dexie;
import { $load } from "../../tools/loader/loader.js";
function init() {
    return $load("dexie").then((res) => {
        Dexie = window.Dexie;
    });
}

export { Dexie, init };
export default Dexie;
