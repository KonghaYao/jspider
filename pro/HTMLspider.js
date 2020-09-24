/**
 * HTML 批量爬取扩展函数
 * @description 基于 JSpider 的扩展函数，工厂式批量爬取
 * @date 2020-09-16
 * @param {Object} ajaxConfig
 * @param {function} parserFunc
 */
const Default = function (dom) {
    return dom.innerHTML;
};
let HTMLSpider = (ajaxConfig, parserFunc, nameList = [], needZip = false) => {
    let func = parserFunc || Default;

    return this.Ajax(ajaxConfig)
        .then((res) => this.TurnToMarkdown(this.HTMLParser(res, func)))
        .then((res) => this.Downloader(res, nameList, needZip));
};
export default HTMLSpider;
