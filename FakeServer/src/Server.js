import { parseURL } from './src/parseURL.js';
export class Request {
    constructor(path, options) {
        Object.assign(this, parseURL(path), {
            headers: options.headers,
        });
    }
}
export class Response {
    constructor(path, options = {}) {}
    send() {}
    setHeaders() {}
}
