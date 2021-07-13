// 测试 基础 Plugins 的代码
import JSpider from '../dist/JSpider.esm.min.js';
const {
    Request, // 请求库
    Download, // 下载库
    ExcelHelper, // 转换数据为表格数据的插件
} = JSpider.plugins;
const { Plugin } = JSpider;

// 您的爬取路径代码
const urls = [...Array(5).keys()].map((i, index) => {
    return { url: '/fake/excel' };
});

export async function main() {
    // 初始化需要初始化的插件
    const spider = new JSpider();
    spider.pipeline(
        Plugin((data) => {
            console.log(data);
            return data;
        }),
        Request(),

        ExcelHelper({
            XLSXOptions: {
                bookType: 'csv', // 可以指定为 csv 或者 xlsx
            },
        }),

        // Download(),
    );
    spider.crawl(urls);
    spider.play();
}
