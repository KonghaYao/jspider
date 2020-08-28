import Script from "./Script.js";
async function XMLParser(string) {
    if (!window.parser) {
        await Script("https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/3.12.16/parser.min.js");
    }
    return parser.parse(string, {
        ignoreAttributes: false,
    });
}
export default XMLParser;
