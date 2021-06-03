import core from "./core/JSpider.js";
import * as plugins from "./plugins/index.js";
import * as tools from "./tools/index.js";
import simpleCrawl from "./simpleCrawl.js";

import rxjs from "./rxjs.js";
import { initPlugins } from "./initPlugins.js";

const JSpider = Object.assign(core, {
    plugins,
    simpleCrawl,
    tools,
    rxjs,
    initPlugins,
});

export { JSpider };
export default JSpider;
