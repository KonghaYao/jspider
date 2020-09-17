/**
 * HTML 批量爬取扩展函数
 * @description 基于 JSpider 的扩展函数，工厂式批量爬取
 * @date 2020-09-16
 * @param {any} ajaxConfig
 * @param {any} parserFunc
 * @returns {any}
 */
function HTMLspider(ajaxConfig, parserFunc, nameList = [], needZip = false) {
    let parserFunc =
        parserFunc ||
        function (dom) {
            return dom.innerHTML;
        };
    return this.lib
        .Ajax(ajaxConfig)
        .then((res) => this.lib.HTMLParser(res, parserFunc))
        .then((res) => this.lib.Downloader(res, nameList, needZip));
}
export default HTMLspider;
