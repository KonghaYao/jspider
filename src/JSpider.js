import { JSpider, Plugin } from "./core/index.js";
import * as plugins from "./plugins/index.js";
import * as tools from "./tools/index.js"; // 工具都是 $ 开头的函数

Object.assign(JSpider, tools, {
    plugins,
    Plugin,
});

export default JSpider;
