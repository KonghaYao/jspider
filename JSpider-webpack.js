//这个文件是用于 webpack 构建 ES5 版本的 JSpider 版本。

import Ajax from "./src/Ajax.js";
import Cookies from "./src/Cookies.js";
import Copy from "./src/Copy.js";
import Downloader from "./src/Downloader.js";
import Observer from "./src/Observer.js";
import Parser from "./src/Parser.js";
import Script from "./src/Script.js";
import Search from "./src/Search.js";
import requestErr from "./src/Ajax/requestErr.js";
import other from "./pro/index.js";

const ALL = { Ajax, Cookies, Copy, Downloader, ...Observer, ...Parser, Script, ...Search, ...other, requestErr };

window.JSpider = class JSpider {};

Object.assign(JSpider.prototype, ALL);
