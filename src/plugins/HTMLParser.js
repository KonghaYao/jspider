const type = {
    svg: "image/svg+xml",
    html: "text/html",
    xml: "text/xml",
};
const HTMLParser = function (string, func, options) {
    let { documentType } = options;
    let parser = new DOMParser();
    let dom = parser.parseFromString(string, type[documentType]);
    return func(dom);
};
export { HTMLParser };
