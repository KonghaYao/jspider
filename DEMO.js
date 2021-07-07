const manager = new Recorder({
    link: alpha,
    connect: 'indexedDB',
    saveTrigger: {
        response(data) {},
        response() {},
    },
});
// JSpider 是一个完整的类，支持链式调用
const alpha = new JSpider(URLArray, {
    buffer: 3,
}).pipeline(
    ExcelHelper((data) => {
        return data.message;
    }),
    Plugin((data) => {
        console.log(data);
        return data;
    }),
    Download(),
);

// 爬虫启动
const doing = alpha.start();

// 模拟我想要中断爬虫
const done = new Promise((resolve) => setTimeout(() => alpha.stop().then(() => resolve()), 5000));

//
