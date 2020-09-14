//这是一个测试文件
let a = new JSpider();
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
];
let b = await a.Ajax({
    urls,
    options: {
        headers: {
            "Content-Type": "application/json",
        },
        method: "post",
    },
    type: "sync",
});
