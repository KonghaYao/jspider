const Ajax = require("./lib/Ajax");
const downloader = require("./lib/Downloader");
const HTMLparser = require("./lib/HTMLParser");
const XMLParser = require("./lib/XMLParser");

class JSpider extends Ajax {
    constructor(options) {
        super(options);
    }
    download = downloader;
    HTMLparser = HTMLparser;
    XMLParser = XMLParser;
    webProxy = webProxy;
}
console.log(new JSpider({}));
