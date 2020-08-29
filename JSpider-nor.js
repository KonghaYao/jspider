import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";
import Script from "./lib/Script.js";

import XMLParser from "./lib/XMLParser.js";
import extend from "./lib/extend.js";
import Search from "./lib/Search.js";

class JSpider extends Ajax {
    constructor(config = {}) {
        super(config);
        this.version = "ext";

        this.extend = extend;
        this.Script = Script;
        this.download = downloader;
        this.HTMLparser = HTMLparser;

        this.XMLParser = XMLParser;
        this.Search = Search;
    }
}
export default JSpider;
