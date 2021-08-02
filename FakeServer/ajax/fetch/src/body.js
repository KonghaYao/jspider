/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { isURLSearchParameters } from './utils/is.js';
import { BODY as INTERNALS } from './INTERNALS.js';

import { consumeBody } from './body/consumeBody.js';

export default class Body {
    constructor(body, { size = 0 } = {}) {
        if (body === null) {
            // Body is undefined or null
            body = new Blob([]);
        } else if (isURLSearchParameters(body)) {
            // Body is a URLSearchParams
            body = new Blob([body]);
        } else if (ArrayBuffer.isView(body)) {
            // Body is ArrayBufferView
            body = new Blob([body]);
        } else {
            body = new Blob([JSON.stringify(body)]);
        }

        this[INTERNALS] = {
            body,
            boundary: null,
            disturbed: false,
            error: null,
        };
        this.size = size;
    }

    get body() {
        return this[INTERNALS].body;
    }

    get bodyUsed() {
        return this[INTERNALS].disturbed;
    }

    async arrayBuffer() {
        const blob = await consumeBody(this[INTERNALS]);
        return blob.arrayBuffer();
    }

    async blob() {
        return consumeBody(this[INTERNALS]);
    }

    async json() {
        const text = await this.text();
        return JSON.parse(text || '{}');
    }

    async text() {
        const blob = await consumeBody(this[INTERNALS]);
        return blob.text();
    }
}

Object.defineProperties(Body.prototype, {
    body: { enumerable: true },
    bodyUsed: { enumerable: true },
    arrayBuffer: { enumerable: true },
    blob: { enumerable: true },
    json: { enumerable: true },
    text: { enumerable: true },
});
