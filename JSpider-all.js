import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";
import Script from "./lib/Script.js";
import extend from "./lib/extend.js";

import XMLParser from "./lib/XMLParser.js";
import Cookies from "./lib/Cookies.js";

import Search from "./lib/Search.js";
import Observer from "./lib/Observer.js";

class JSpider extends Ajax {
    constructor(config = {}) {
        super(config);
        this.version = "pro";

        this.extend = extend;
        this.downloader = downloader;
        this.Script = Script;
        this.HTMLparser = HTMLparser;

        this.XMLParser = XMLParser;
        this.Cookies = Cookies;

        this.Observer = Observer;
        this.Search = Search;
    }
}
