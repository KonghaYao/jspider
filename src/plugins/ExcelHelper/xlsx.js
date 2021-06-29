import { $load } from '../../tools/loader/loader.js';

let XLSX;
function init() {
    return $load('xlsx').then(() => {
        XLSX = window.XLSX;
    });
}
export { XLSX, init };
