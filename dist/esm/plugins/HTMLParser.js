import { m as map } from '../map-94257997.js';
import '../Subscriber-66236423.js';

const type = {
    svg: "image/svg+xml",
    html: "text/html",
    xml: "text/xml",
};
const Parser = function (string, func, options) {
    let { documentType } = options;
    let parser = new DOMParser();
    let dom = parser.parseFromString(string, type[documentType]);
    return func(dom);
};
const HTMLParser = (callback, options) => (source) => {
    let { formatter } = options || {};
    return source.pipe(
        map((task) => {
            let data = task.$commit("processing");
            if (formatter) data = formatter(data);
            let result = Parser(data, callback, options);
            task.$commit("success", result);
            return task;
        })
    );
};

export { HTMLParser };
