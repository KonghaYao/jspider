import core from "./core/JSpider.js";
import * as plugins from "./plugins/index.js";
import simpleCrawl from "./simpleCrawl.js";
core.plugins = plugins;
core.simpleCrawl = simpleCrawl;

export default core;
