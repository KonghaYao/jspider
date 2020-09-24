import Script from "../Script.js";
/**
 * 主函数
 * @date 2020-09-16
 * @param {Array} HTMLStringArray
 * @returns {Array} 返回处理完成的数组
 */
async function XMLParser(HTMLStringArray) {
    if (!window.parser) {
        await Script("https://cdn.bootcdn.net/ajax/libs/fast-xml-parser/3.17.1/parser.min.js");
    }
    return HTMLStringArray.map((string) => parser.parse(string));
}
export default XMLParser;
