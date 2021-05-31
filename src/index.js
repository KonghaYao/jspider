import core from "./core/JSpider.js";
import "./fakeServer/fakeServer.js";
import plugins from "./plugins/index.js";
core.plugins = plugins;
export default core;
