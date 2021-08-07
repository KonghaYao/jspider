// 测试 基础 Plugins 的代码
import JSpider from '../dist/JSpider.esm.min.js';
const {
    Request, // 请求库
    Download, // 下载库
    ExcelHelper, // 转换数据为表格数据的插件
    ZipFile,
    Combine,
} = JSpider.plugins;
const { Plugin } = JSpider;

// 您的爬取路径代码
const urls = [...Array(5).keys()].map((i, index) => {
    return { url: '/fake/excel' };
});

export async function main() {
    // 初始化需要初始化的插件
    const spider = new JSpider({
        logEvery: true,
    });
    spider.pipeline(
        Request({ delay: 100, buffer: 2, retry: 3, handleError: null }),

        Combine(3, 1000),
        ExcelHelper(
            (data) => {
                return {
                    [new Date().getTime()]: data
                        .map((i) => i.data)
                        .flat()
                        .flat()
                        .flat(),
                };
            },
            {
                XLSXOptions: {
                    bookType: 'csv', // 可以指定为 csv 或者 xlsx
                },
            },
        ),
        // ZipFile({ chunk: 2 }),

        Download(),
    );
    spider.crawl(urls);
    spider.start();
    return spider;
}
