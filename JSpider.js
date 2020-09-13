import Ajax from "./lib/Ajax.js";

import Parser from "./lib/Parser.js";

import Script from "./lib/Script.js";
import extend from "./lib/extend.js";

import Search from "./lib/Search.js";
import Observer from "./lib/Observer.js";

class JSpider {
    result = {
        ajaxResults: [],
        parserResults: [],
    };
    ajax = Ajax;
    extend = extend;
    Script = Script;
    Parser = Parser;
    Observer = Observer;
    Search = Search;
}
export default JSpider;
