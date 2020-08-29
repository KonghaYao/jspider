import Ajax from "./lib/Ajax.js";
import downloader from "./lib/Downloader.js";
import HTMLparser from "./lib/HTMLParser.js";

class JSpider extends Ajax {
    constructor(config) {
        super(config);
        this.version = "core";
        this.download = downloader;
        this.HTMLparser = HTMLparser;
    }
}
export default JSpider;
