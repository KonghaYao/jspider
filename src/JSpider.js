import core from "./core/JSpider.js";
import * as plugins from "./plugins/index.js";
import * as tools from "./tools/index.js";
import simpleCrawl from "./simpleCrawl.js";

import * as pluginTools from "./pluginTools.js";

const JSpider = Object.assign(core, {
    plugins,
    simpleCrawl,
    tools,
    ...pluginTools,
});

export default JSpider;
