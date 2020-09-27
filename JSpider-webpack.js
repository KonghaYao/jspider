//这个文件是用于 webpack 构建 ES5 版本的 JSpider 版本。

import Ajax from "./lib/Ajax.js";
import Cookies from "./lib/Cookies.js";
import Copy from "./lib/Copy.js";
import Downloader from "./lib/Downloader.js";
import Observer from "./lib/Observer.js";
import Parser from "./lib/Parser.js";
import Script from "./lib/Script.js";
import Search from "./lib/Search.js";

import other from "./pro/index.js";

const ALL = { Ajax, Cookies, Copy, Downloader, ...Observer, ...Parser, Script, ...Search, ...other };

window.JSpider = class JSpider {};

Object.assign(JSpider.prototype, ALL);
