import JSpider from '../dist/JSpider.esm.min.js';
window.JSpider = JSpider;
import { main } from './Request.js';
import { ui } from './ui.js';
const { $Mock } = JSpider;

async function Main() {
    // 导入后台
    await $Mock('excel');
    const spider = await main();
    console.log(spider.views);
    ui(spider.views);
}
Main();
