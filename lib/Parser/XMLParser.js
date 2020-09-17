import Script from "../Script.js";
/**
 * 主函数
 * @date 2020-09-16
 * @param {Array} HTMLStringArray
 * @returns {Array} 返回处理完成的数组
 */
async function XMLParser(HTMLStringArray) {
    if (!window.parser) {
        await Script("https://cdn.jsdelivr.net/npm/fast-xml-parser@3.17.4/src/parser.min.js");
    }
    return HTMLStringArray.map((string) =>
        parser.parse(string, {
            ignoreAttributes: false,
        })
    );
}
export default XMLParser;
