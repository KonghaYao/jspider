import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";
import XMLParser from "./lib/XMLParser.js";
import Cookies from "./lib/Cookies.js";
import Hook from "./lib/hook.js";

class JSpider extends Ajax {
    constructor(config) {
        super(config);
        this.verson = "pro";
        this.downloader = downloader;
        this.HTMLparser = HTMLparser;
        this.XMLParser = XMLParser;
        this.Cookies = Cookies;
        this.hook = Hook;
    }
}
export default JSpider;
