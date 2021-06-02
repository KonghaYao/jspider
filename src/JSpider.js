import core from "./core/JSpider.js";
import * as plugins from "./plugins/index.js";
import simpleCrawl from "./simpleCrawl.js";
import tools from "./tools/index.js";

export default Object.assign(core, {
    plugins,
    simpleCrawl,
    tools,
});
