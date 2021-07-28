// 使用不完全覆盖的方式，使用继承方式继承所有的属性
// 只在 send 方式调用的时候对其进行数据返回
import { pick } from 'lodash-es';
import { defineGetAndSet } from './defineGetterAndSetter.js';
import HTTP_STATUS_CODES from './constant.js';
let XHR;
const config = {
    request: null,
    response: null,
    silent: false,
};

// ! 虽然 XMLHttpRequest 不能够修改，但是可以通过设置 getter 和 setter 将属性映射到 $属性上，这样的话，原生 XHR 会将数据写入和读取的位置更改为新的对象属性上，这样就可以被我们修改了。

class MockXMLHttpRequest extends window.XMLHttpRequest {
    constructor(...args) {
        super(...args);
    }
    _responseHeaders = {};
    $mock = true; // 标识是否打开拦截
    open(method, url, _, username, password) {
        // 不进行同步操作
        XHR.prototype.open.call(this, method, url, true, username, password);
        this.$data.url = url;
        this.$data.method = method.toLowerCase();
    }
    send(body) {
        if (this.$mock) {
            const options = pick(this.$data, ['headers', 'method']);
            // ! 这里的 proxy 中的参数固定为 fetch 中的标准。
            const result = config.proxy(this.$data.url, options);

            if (result.body) {
                defineGetAndSet(this);
                this.dispatchEvent(new Event('loadstart'));
                setTimeout(() => this.$done.bind(this)(result), this.timeout || 100);
                return null;
            }
            // 这里穿透下去
        }
        XHR.prototype.send.call(this, body);
    }
    setRequestHeader(key, value) {
        this.$data.headers[key] = value;
        return XHR.prototype.setRequestHeader.call(this, key, value);
    }

    $data = {
        // 原生属性的 getter 和 setter
        readyState: 0,
        status: 200,
        response: '',
        responseText: '',
        statusText: '',
        headers: {},
        url: '',
        method: 'get',
    };

    $done({ body, headers, status }) {
        // 伪造 XHR 返回事件
        this.readyState = this.HEADERS_RECEIVED;
        this.dispatchEvent(new Event('readystatechange'));
        this.readyState = this.LOADING;
        this.dispatchEvent(new Event('readystatechange'));
        this._responseHeaders = headers;
        this.status = status;
        this.statusText = HTTP_STATUS_CODES[status];
        this.response = body;
        this.responseText = typeof this.response === 'string' ? this.response : JSON.stringify(this.response);
        this.readyState = this.DONE;
        this.dispatchEvent(new Event('readystatechange'));
        this.dispatchEvent(new Event('load'));
        this.dispatchEvent(new Event('loadend'));
    }
}
export function mockXHR({ proxy, silent = false }) {
    if (proxy instanceof Function) config.request = proxy;

    config.silent = silent;

    // 这个文件中的 XHR

    // 代理 fetch 的初始化函数
    if (window.XMLHttpRequest && !window.XMLHttpRequest.$mock) {
        [XHR, window.XMLHttpRequest] = [window.XMLHttpRequest, MockXMLHttpRequest];
        window.XMLHttpRequest.$mock = true;
        if (!silent) console.warn('XHR 已经被代理');
    }
}
