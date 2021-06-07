import JSpider from "../dist/esm/JSpider.js";
import "../dist/esm/fakeServer/fakeServer.js"; // 虚拟后台
window.JSpider = JSpider;
import { main } from "./Request.js";
const { $Mock } = JSpider.tools;
async function Main() {
    // 导入后台
    await $Mock("excel");
    main();
}
Main();
