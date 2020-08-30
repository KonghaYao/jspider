import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";
import Script from "./lib/Script.js";
import extend from "./lib/extend.js";

class JSpider extends Ajax {
    constructor(config = {}) {
        super(config);
        this.version = "core";
        this.Script = Script;
        this.download = downloader;
        this.HTMLParser = HTMLparser;
        this.extend = extend;
    }
}
export default JSpider;
