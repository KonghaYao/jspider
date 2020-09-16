import Script from "../Script.js";

/**
 * 主要函数
 * @date 2020-09-16
 * @param {Array} HTMLStringArray HTML 字符串数组
 * @returns {any} Markdown 字符串
 */
async function TurnToMarkdown(HTMLStringArray) {
    if (!window.turndownService) {
        await Script("https://cdn.jsdelivr.net/npm/turndown/dist/turndown.js");
        init();
    }
    return HTMLStringArray.map((i) => turndownService.turndown(i));
}

// turndown.js 初始化
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
