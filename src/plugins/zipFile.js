import { bufferCount, concatMap } from "rxjs/operators";

import { Plugin } from "../core/PluginSystem.js";

import { init } from "./JSzip/JSzip.js";
import { zipper } from "./JSzip/zipper.js";

import { toFile } from "./utils/toFile.js";
import { TaskGroup } from "../core/Task/TaskGroup.js";

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
                    bufferCount(chunk),

                    concatMap((tasks) =>
                        this.TaskStarter(new TaskGroup(tasks), this.uuid)
                    )
                );
        }
    });
};
