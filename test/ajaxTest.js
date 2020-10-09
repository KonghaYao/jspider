// 复制到开发者工具中使用

// ajax 模块测试
let urls = [
    "/",
    ...[...Array(10).keys()].map((i) => {
        return {
            url: "/",
            options: {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ index: i }),
            },
        };
    }),
    "/",
];
let ajaxResult = await JSpider.prototype.Ajax({
    urls,
    options: {
        headers: {
            "Content-Type": "application/json",
        },
        method: "get",
    },
    type: "start",
});
console.dir(ajaxResult);
console.log("%c ajax模块完成", "color:red");

// 解析模块

// HTML 模块测试
let ParseResult = await JSpider.prototype.HTMLParser(ajaxResult, (dom) => dom.innerHTML);
console.dir("解析结果：", ParseResult);

// Markdown  模块测试
let Markdown = await JSpider.prototype.TurnToMarkdown(ParseResult.filter((i) => i));
console.log(Markdown);

// XML 模块测试
let XMLresult = await JSpider.prototype.Ajax({ urls: ["./test/xmlText.xml"], type: "start" });
console.log(XMLresult);
let json = await JSpider.prototype.XMLParser(XMLresult);
console.log(json);

// Downloader 模块测试
await JSpider.prototype.Downloader(Markdown, ["1.md", "2.md"], true);
