// ajax 测试
try {
    let urls = [
        "/",
        ...[...Array(10).keys()].map((i) => {
            return {
                url: "/",
                options: {
                    method: "POST",
                    headers: {
                        "content-type": "text/plain; charset=utf",
                    },
                    body: JSON.stringify({ index: i }),
                },
            };
        }),
        "/",
    ];
    var ajaxResult = await JSpider.prototype.Ajax({
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
} catch (err) {
    console.log("ajax模块出错", err);
}

//Parse 模块
try {
    var ParseResult = await JSpider.prototype.HTMLParser(ajaxResult, (dom) => dom.innerHTML);
    console.dir(ParseResult);
} catch (err) {
    console.log("HTML解析出错", err);
}

try {
    var Markdown = await JSpider.prototype.TurnToMarkdown(ParseResult.filter((i) => i));
    console.log(Markdown);
} catch (err) {
    console.log("Markdown转换模块出错", err);
}

//XML 解析模块

//Downloader 模块
//无法操控事件
try {
    await JSpider.prototype.Downloader(Markdown, ["1.md", "2.md"], true);
} catch (err) {
    console.log("downloader模块出错", err);
}
