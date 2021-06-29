import { $load } from '../../tools/loader/loader.js';

let Dexie;
function init() {
    return $load('dexie').then(() => {
        Dexie = window.Dexie;
    });
}

export { Dexie, init };
export default Dexie;
