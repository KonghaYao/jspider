/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plugin } from '@src/Pipeline/PluginSystem.js';

import { init } from './JSzip/JSzip.js';
import { zipper } from './JSzip/zipper.js';

import { toFile } from './utils/toFile.js';

export const ZipFile = function (options = {}) {
    if (!options.zipFileName) options.zipFileName = new Date().getTime();
    return Plugin({
        init,
        name: 'zipFile',
        main(blob) {
            const { zipFileName } = this.options;
            const files = toFile(blob, zipFileName);
            return zipper(files, zipFileName);
        },
        options,
    });
};
