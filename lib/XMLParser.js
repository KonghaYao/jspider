function getXMLParser() {
    return new Promise((res) => {
        let script = document.createElement("script");
        script.onload = () => {
            res("%c XMLParser载入成功", "color:green");
        };
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/3.12.16/parser.min.js";
        document.body.appendChild(script);
        console.log("XMLParser载入中");
    });
}
async function XMLParser(string) {
    if (!window.parser.parse) {
        await getXMLParser();
    }
    return parser.parse(string, {
        ignoreAttributes: false,
    });
}
module.exports = XMLParser;
