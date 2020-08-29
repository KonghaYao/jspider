import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";
import XMLParser from "./lib/XMLParser.js";
import Cookies from "./lib/Cookies.js";
import extend from "./lib/extend.js";
import { Globals } from "./lib/Search.js";

class JSpider extends Ajax {
    constructor(config = {}) {
        super(config);
        this.verson = "ext";
        this.extend = extend;

        this.download = downloader;
        this.HTMLparser = HTMLparser;

        this.XMLParser = XMLParser;
        this.Cookies = Cookies;
        this.Globals = Globals;
    }
}
export default JSpider;
