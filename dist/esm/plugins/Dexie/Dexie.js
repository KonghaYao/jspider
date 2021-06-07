import { $load } from '../../tools/loader/loader.js';
import '../../tools/loader/scriptStore.js';
import '../../tools/loader/loaderFunction.js';

let Dexie;
function init() {
    return $load("dexie").then((res) => {
        Dexie = window.Dexie;
    });
}
var Dexie$1 = Dexie;

export default Dexie$1;
export { Dexie, init };
