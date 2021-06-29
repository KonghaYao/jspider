// 尚未进行测试
import { Plugin } from '../core/PluginSystem';

const type = {
    svg: 'image/svg+xml',
    html: 'text/html',
    xml: 'text/xml',
};
const Parser = function (string, func, documentType = 'text/html') {
    const parser = new DOMParser();
    const dom = parser.parseFromString(string, type[documentType]);
    return func(dom);
};
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
