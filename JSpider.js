import Ajax from "./src/Ajax.js";
import Cookies from "./src/Cookies.js";
import Copy from "./src/Copy.js";
import Downloader from "./src/Downloader.js";
import Extend from "./src/Extend.js";
import Observer from "./src/Observer.js";
import Parser from "./src/Parser.js";
import Script from "./src/Script.js";
import Search from "./src/Search.js";

const ALL = { Ajax, Cookies, ...Copy, Downloader, Extend, ...Observer, ...Parser, Script, ...Search };

class JSpider {}
Object.assign(JSpider.prototype, ALL);

export default JSpider;
