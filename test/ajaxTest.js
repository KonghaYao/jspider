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
let spider = new JSpider();
let ajaxResult = await spider.Ajax({
    urls,
    options: {
        headers: {
            "Content-Type": "application/json",
        },
        method: "get",
    },
    limits: 3,
    time: 500,
    type: "start",
});
console.dir(ajaxResult);

// 解析模块

// HTML 模块测试
let ParseResult = await spider.HTMLParser(ajaxResult, (dom) => dom.innerHTML);
console.log("解析结果：", ParseResult);

// Markdown  模块测试
let Markdown = await spider.TurnToMarkdown(ParseResult.filter((i) => i));
console.log("markdown解析模块", Markdown);

// XML 模块测试
let XMLresult = await spider.Ajax({ urls: ["./test/xmlText.xml"], type: "start" });
console.log("xml 解析模块请求", XMLresult);
let json = await spider.XMLParser(XMLresult);
console.log("xml 解析结果：", json);

// Downloader 模块测试
// await spider.Downloader(Markdown, ["1.md", "2.md"], true);
