import Script from "./Script.js";
async function XMLParser(string) {
    if (!window.parser) {
        await Script("https://cdn.bootcdn.net/ajax/libs/fast-xml-parser/1.0.0/parser.min.js");
    }
    return parser.parse(string, {
        ignoreAttributes: false,
    });
}
export default XMLParser;
