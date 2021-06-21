import core from "./core/JSpider.js";
import * as plugins from "./plugins/index.js";
import * as tools from "./tools/index.js"; // 工具都是 $ 开头的函数
import simpleCrawl from "./simpleCrawl.js";

import * as pluginTools from "./pluginTools.js";

const JSpider = Object.assign(core, tools, {
    plugins,
    simpleCrawl,
    ...pluginTools,
});

export default JSpider;
