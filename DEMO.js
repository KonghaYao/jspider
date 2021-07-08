// JSpider 是一个完整的类，支持链式调用

// 定义爬取的数据
const spider = new JSpider(URLArray, {
    buffer: 3,
});

// 定义处理数据的方法
spider.pipeline(
    ExcelHelper((data) => {
        return data.message;
    }),
    Plugin((data) => {
        console.log(data);
        return data;
    }),
    // Download(),
);

// 连接数据持久化装置
const manager = new Recorder({
    link: spider,
    connect: 'indexedDB',
    // 触发保存的事件
    saveTrigger: {
        // Trigger 的名称统一是 Where:EventName
        'workflow:success'() {},
        'request:success': {
            main() {},
            throttleTime: 100,
        },
        'plugin:success'() {},
    },
});

// 爬虫启动
const doing = spider.start();

// 模拟中断爬虫
const done = new Promise((resolve) => setTimeout(() => spider.stop().then(() => resolve()), 5000));

//
