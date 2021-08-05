/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { isURLSearchParameters } from '../utils/is.js';
import { BODY as INTERNALS } from '../INTERNALS';
export const extractContentType = (body, request) => {
    if (body === null) {
        return null;
    }

    if (typeof body === 'string') {
        return 'text/plain;charset=UTF-8';
    }

    if (isURLSearchParameters(body)) {
        return 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    if (body instanceof Blob) {
        return body.type || null;
    }

    if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
    }

    return 'text/plain;charset=UTF-8';
};
