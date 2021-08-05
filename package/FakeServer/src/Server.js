/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { parseURL } from './parseURL.js';
export class Request {
    constructor(path, options) {
        Object.assign(this, parseURL(path), options);
    }
}
export class Response {
    constructor() {}
    headers = {
        'Access-Control-Allow-Origin': '*',
        Age: 1200, // 单位为秒
        Allow: 'GET, POST',
        'Content-Encoding': 'gzip',
        'Content-Type': 'text/html; charset=utf-8',
    };
    status = 200;
    body = null;
    send(body) {
        this.body = body;
    }
    setHeaders(headers) {
        Object.entries(headers).forEach(([key, value]) => {
            this.headers[key] = value;
        });
    }
}
