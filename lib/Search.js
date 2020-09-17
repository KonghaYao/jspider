import Globals from "./Search/Globals.js";
import searchBase from "./Search/searchBase.js";

/**
 * 搜索入口函数
 * @date 2020-09-16
 * @param {Object} obj 被搜索的对象
 * @param {Regexp} regex 搜索使用的正则表达式
 * @param {Number} max=5 最大搜索深度
 * @returns {Object} 返回搜索结果的结构化结果
 */
function search(obj, reg, max = 5) {
    if (max < 2) {
        console.log("深度不够");
    }
    if (!reg instanceof RegExp && reg instanceof String) {
        reg = new RegExp(reg);
    }
    if (obj instanceof Object) {
        return Object.fromEntries(searchBase(Object.entries(obj), reg, max));
    } else {
        throw new Error("不是对象，不能搜索");
    }
}

// 注意 这里删除了 searchWindow
// 若要实现其功能 请使用 search(Globals(),/test/)

export default { search, Globals };
