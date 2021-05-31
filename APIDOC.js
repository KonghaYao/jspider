const JSpider = JSpider;
const { Request, HTMLParser, Download } = JSpider.plugins;

// 收集到urls
let urls = [];

// 创建工作流，工作流可以视为是一套工作流程，包含对数据的处理
// 在工作流中，所有的参数都是插件函数，可以极大提高扩展性
// 这一点是受到了 Rxjs 的启发
let workflow = new JSpider(
    Request(requestOptions),
    HTMLParser(() => {
        return dom.innerHTML;
    }),
    Download()
);

// 然后对你的 urls 应用工作流
let spider = workflow.apply(urls);

// 重新启动工作流
spider.restart();

// 启动和暂停工作流，但是进行中的工作不会停止
spider.pause();
spider.play();

// 报告相应的错误
spider.report(); // 打印所有的数据
spider.report("error"); // 只打印错误
spider.report("done"); // 打印完成
