import JSpider from "../dist/esm/JSpider.js";
window.JSpider = JSpider;
import { main } from "./Request.js";
import { ZipTest } from "./ZipTest.js";
const { $Mock } = JSpider;

async function Main() {
    // 导入后台
    await $Mock("excel");
    main();
    // ZipTest();
}
Main();
