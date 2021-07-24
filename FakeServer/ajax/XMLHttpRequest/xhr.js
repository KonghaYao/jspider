// 使用不完全覆盖的方式，使用继承方式继承所有的属性
// 只在 send 方式调用的时候对其进行数据返回
import { pick } from 'lodash-es';
import { defineGetAndSet } from './defineGetterAndSetter.js';
import HTTP_STATUS_CODES from './constant.js';
let XMLHttpRequest;
const config = {
    request: null,
    response: null,
    silent: false,
};

function makeResponse() {}

// ! 虽然 XMLHttpRequest 不能够修改，但是可以通过设置 getter 和 setter 将属性映射到 $属性上，这样的话，原生 XHR 会将数据写入和读取的位置更改为新的对象属性上，这样就可以被我们修改了。

class MockXMLHttpRequest extends XMLHttpRequest {
    constructor(...args) {
        super(...args);
    }
    $mock = true; // 标识是否打开拦截
    open(method, url, _, username, password) {
        // 不进行同步操作
        XMLHttpRequest.prototype.open.call(this, method, url, true, username, password);
        this.$data.url = url;
        this.$data.method = method.toLowerCase();
    }
    send(body) {
        if (this.$mock) {
            const options = pick(this.$data, ['headers']);
            const result = config.request(this.$data.url, options);
            if (result) {
                defineGetAndSet(this);
                this.dispatchEvent(new Event('loadstart'));
                setTimeout(this.$done.bind(this), this.timeout || 100);
                return null;
            }
            // 这里穿透下去
        }
        XMLHttpRequest.prototype.send.call(this, body);
    }
    setRequestHeader(key, value) {
        this.$data.headers[key] = value;
        return XMLHttpRequest.prototype.setRequestHeader.call(this, key, value);
    }
    get $mock() {
        return this.$mock;
    }
    set $mock(value) {
        if (typeof value === 'boolean') {
            this.$mock = value;
            return true;
        }
        return false;
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

    $done() {
        // 伪造 XHR 返回事件
        this.readyState = this.HEADERS_RECEIVED;
        this.dispatchEvent(new Event('readystatechange'));
        this.readyState = this.LOADING;
        this.dispatchEvent(new Event('readystatechange'));

        this.status = 200;
        this.statusText = HTTP_STATUS_CODES[200];
        // ! 传入创建函数，给与使用者开放权限
        const response = config.response(makeResponse);
        this.response = response;
        this.responseText = typeof this.response === 'string' ? this.response : JSON.stringify(this.response);
        this.readyState = this.DONE;
        this.dispatchEvent(new Event('readystatechange'));
        this.dispatchEvent(new Event('load'));
        this.dispatchEvent(new Event('loadend'));
    }
}
export function mockXHR({ request: req, response: res, silent = false }) {
    if (req instanceof Function) config.request = req;
    if (res instanceof Function) config.response = res;
    config.silent = silent;
    XMLHttpRequest = window.XMLHttpRequest;
    // 代理 fetch 的初始化函数
    if (window.XMLHttpRequest && !window.XMLHttpRequest.$mock) {
        window.XMLHttpRequest = MockXMLHttpRequest;
        window.XMLHttpRequest.$mock = true;
        if (!silent) console.warn('fetch 已经被代理');
    }
}
