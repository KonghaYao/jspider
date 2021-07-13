import JSpider from '../dist/JSpider.esm.min.js';
window.JSpider = JSpider;
import { main } from './Request.js';
const { $Mock } = JSpider;

async function Main() {
    // 导入后台
    await $Mock('excel');
    main();
}
Main();
