//这是一个 ajax 模块的测试文件
let spider = new JSpider();
let urls = [
    "/",
    ...[...Array(10).keys()].map((i) => {
        return {
            url: "/",
            options: {
                headers: {
                    "content-type": "text/plain; charset=utf",
                },
                body: JSON.stringify({ index: i }),
            },
        };
    }),
    "/",
];
let res = await spider.Ajax({
    urls,
    options: {
        headers: {
            "Content-Type": "application/json",
        },
        method: "post",
    },
    type: "start",
});
console.log(res);
