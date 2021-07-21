/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { $load } from '@tools/loader/loader.js';

let Dexie;
function init() {
    return $load('dexie').then(() => {
        Dexie = window.Dexie;
    });
}

export { Dexie, init };
export default Dexie;
