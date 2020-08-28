import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";
import XMLParser from "./lib/XMLParser.js";

class JSpider extends Ajax {
    constructor(options) {
        super(options);
        this.download = downloader;
        this.HTMLparser = HTMLparser;
        this.XMLParser = XMLParser;
    }
}
export default JSpider;
