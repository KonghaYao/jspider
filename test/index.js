import JSpider from "../dist/JSpider.js";
import "../dist/fakeServer.js"; // 虚拟后台
window.JSpider = JSpider;
import { main } from "./Request.js";
main();
