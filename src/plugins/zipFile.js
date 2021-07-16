import { bufferTime, concatMap, filter, mergeMap, tap } from 'rxjs/operators';

import { Plugin } from '../Pipeline/PluginSystem.js';

import { init } from './JSzip/JSzip.js';
import { zipper } from './JSzip/zipper.js';

import { toFile } from './utils/toFile.js';
import { TaskGroup } from '../TaskSystem/TaskGroup.js';
import { EMPTY } from 'rxjs';

export const ZipFile = function (options = {}) {
    if (!options.zipFileName) options.zipFileName = new Date().getTime();
    return Plugin({
        init,
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
                    bufferTime(1000, undefined, chunk),
                    filter((i) => i.length), // 必须要进行检测是否为空
                    concatMap((tasks) =>
                        this.TaskStarter(
                            new TaskGroup(tasks),

                            this.uuid,
                        ),
                    ),
                    concatMap((i) => i.$destroy()),
                );
        },
    });
};
