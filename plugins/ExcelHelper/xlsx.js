/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { $load } from '@tools/loader/loader.js';

let XLSX;
function init() {
    return $load('xlsx').then(() => {
        XLSX = window.XLSX;
    });
}
export { XLSX, init };
