/**
 * 搜索全局变量
 * @date 2020-09-17
 * @param {RepExp} RegExp 正则对象
 * @param {Number} deep 搜索深度
 * @returns {Object} 返回搜索结果对象
 */
function searchWindow(RegExp, deep) {
    let search = this.lib.search;
    let Globals = this.lib.Globals;
    return search(Globals(), RegExp, deep);
}
export default searchWindow;
