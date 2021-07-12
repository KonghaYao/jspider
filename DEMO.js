// JSpider 是一个完整的类，支持链式调用

// 申明一些 JSpider 实例的 config
const spider = new JSpider({});

// 定义处理数据的方法
spider.pipeline(
    Request(function preprocess() {}),
    ExcelHelper((data) => {
        return data.message;
    }),
    Plugin((data) => {
        console.log(data);
        return data;
    }),
    // Download()
    Memory({
        connect: 'indexedDB', // 选择存储的位置
        storageName: 'default', // 存储区域的名称
    }),
);

// 爬虫启动
spider.crawl(string);
spider.crawl([string, string]);
spider.crawl(string1, string2);

// 模拟中断爬虫
const paused = new Promise((resolve) => setTimeout(() => spider.stop().then(() => resolve()), 5000));
