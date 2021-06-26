const type = {
    svg: "image/svg+xml",
    html: "text/html",
    xml: "text/xml",
};
const Parser = function (string, func, documentType = "text/html") {
    let parser = new DOMParser();
    let dom = parser.parseFromString(string, type[documentType]);
    return func(dom);
};

// 尚未进行测试
import { Plugin } from "../core/PluginSystem";
export function HTMLParser(callback, options = {}) {
    return Plugin({
        options,
        main(data) {
            const { formatter, documentType } = this.options;
            if (formatter) data = formatter(data);
            return Parser(data, callback, documentType);
        },
    });
}
