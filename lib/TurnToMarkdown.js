import Script from "./Script.js";
async function TurnToMarkdown(array) {
    if (!window.turndownService) {
        await Script("https://cdn.jsdelivr.net/npm/turndown/dist/turndown.js");
        init();
    }
    this.MarkResult = array.map((i) => turndownService.turndown(i));
    console.log("%c Markdown完成", "color:green");
}
function init() {
    window.turndownService = new TurndownService({
        headingStyle: "atx",
        hr: "- - -",
        bulletListMarker: "*",
        codeBlockStyle: "fenced",
        fence: "```",
        emDelimiter: "*",
        strongDelimiter: "**",
        linkStyle: "inlined",
        linkReferenceStyle: "collapsed",
    });
    turndownService.addRule("strikethrough", {
        filter: ["br"],
        replacement: function () {
            return "<br>";
        },
    });
}
export default TurnToMarkdown;
