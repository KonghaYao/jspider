function sleepRandom(result) {
    return new Promise((res) => setTimeout(() => res(result), 200));
}
// 对 mockjs 扩充 fetch 的代理
class fakeResponse {
    constructor(result) {
        this.data = result;
    }
    json() {
        return this.data instanceof Object ? this.data : JSON.parse(this.data);
    }
    blob() {
        return new Blob([this.data]);
    }
    text() {
        return JSON.stringify(this.data);
    }
}
class MockFetch {
    constructor(Mock) {
        this.Mock = Mock;
        if (!window.fetch.isFake) this.fakeFetch();
    }
    fakeFetch() {
        const that = this;
        window.$fetch = window.fetch;
        window.fetch = function (url, options = {}) {
            let result = that.find({
                url,
                type: options.method || "GET",
            });
            if (result) {
                const data = that.convert(result, {});
                console.warn("代理中", data);
                return new Promise((res) => res(new fakeResponse(data))).then((res) => sleepRandom(res));
            } else {
                console.log("未使用 mockjs");
                return window.$fetch(...arguments).then((res) => sleepRandom(res));
            }
        };
    }
    // 查找与请求参数匹配的数据模板：URL，Type
    // options = {url,type}
    find(options) {
        for (var sUrlType in this.Mock.XHR.Mock._mocked) {
            var item = this.Mock.XHR.Mock._mocked[sUrlType];
            if ((!item.rurl || this.match(item.rurl, options.url)) && (!item.rtype || this.match(item.rtype, options.type.toLowerCase()))) {
                // console.log('[mock]', options.url, '>', item.rurl)
                return item;
            }
        }
        return false;
    }
    // 匹配 url 用的
    match(expected, actual) {
        if (this.Mock.Util.type(expected) === "string") {
            return expected === actual;
        }
        if (this.Mock.Util.type(expected) === "regexp") {
            return expected.test(actual);
        }
    }
    // 数据模板 ＝> 响应数据
    convert(item, options) {
        return this.Mock.Util.isFunction(item.template) ? item.template(options) : this.Mock.XHR.Mock.mock(item.template);
    }
}

export { MockFetch as default };
