import Globals from "./Search/Globals.js";
import searchBase from "./Search/searchBase.js";

// 注意 这里删除了 searchWindow，
// 若要实现其功能 请search(Globals,/test/)
function search(obj, reg, max = 5) {
    if (max < 2) {
        console.log("深度不够");
    }
    if (!reg instanceof RegExp && reg instanceof String) {
        reg = new RegExp(reg);
    }
    return Object.fromEntries(searchBase(Object.entries(obj), reg, max));
}

export default { search, Globals };
