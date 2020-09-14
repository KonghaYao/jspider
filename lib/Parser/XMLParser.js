import Script from "../Script.js";
async function XMLParser(string) {
    if (!window.parser) {
        await Script("https://cdn.jsdelivr.net/npm/fast-xml-parser@3.17.4/src/parser.min.js");
    }
    return parser.parse(string, {
        ignoreAttributes: false,
    });
}
export default XMLParser;
