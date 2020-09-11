import Script from "./Script.js";
async function TurnToMarkdown(string) {
    if (!window.turndownService) {
        await Script("https://cdn.jsdelivr.net/npm/turndown/dist/turndown.js");
        init();
    }
    return turndownService.turndown(string);
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
        replacement: function (content) {
            return "<br>";
        },
    });
}
export default TurnToMarkdown;
