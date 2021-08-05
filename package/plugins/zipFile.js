/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { bufferTime, concatMap, filter } from 'rxjs/operators';

import { Plugin } from '@src/Pipeline/PluginSystem.js';

import { init } from './JSzip/JSzip.js';
import { zipper } from './JSzip/zipper.js';

import { toFile } from './utils/toFile.js';
import { TaskGroup } from '@src/TaskSystem/TaskGroup.js';

export const ZipFile = function (options = {}) {
    if (!options.zipFileName) options.zipFileName = new Date().getTime();
    return Plugin({
        init,
        name: 'zipFile',
        main(data) {
            const { zipFileName } = this.options;
            const files = data.map((blob) => toFile(blob, zipFileName));
            return zipper(files, zipFileName);
        },
        options,
        operator() {
            // 复写 operator
            const { chunk = 3 } = this.options;
            return (source) =>
                source.pipe(
                    bufferTime(5000, undefined, chunk),
                    filter((i) => i.length), // 必须要进行检测是否为空
                    concatMap((tasks) =>
                        this.TaskStarter(
                            new TaskGroup(tasks),

                            this.uuid,
                        ),
                    ),
                );
        },
    });
};
