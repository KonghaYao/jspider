import Ajax from "./lib/Ajax.js";
import Cookies from "./lib/Cookies.js";
import Copy from "./lib/Copy.js";
import Downloader from "./lib/Downloader.js";
import Extend from "./lib/Extend.js";
import Observer from "./lib/Observer.js";
import Parser from "./lib/Parser.js";
import Script from "./lib/Script.js";
import Search from "./lib/Search.js";

const ALL = { Ajax, Cookies, ...Copy, Downloader, Extend, ...Observer, ...Parser, Script, ...Search };

class JSpider {}
Object.assign(JSpider.prototype, ALL);

export default JSpider;
