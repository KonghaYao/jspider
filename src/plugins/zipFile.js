import { from } from "rxjs";
import { bufferCount, switchMap } from "rxjs/operators";

import { Plugin } from "../core/PluginSystem.js";

import { init } from "./JSzip/JSzip.js";
import { zipper } from "./JSzip/zipper.js";

import { toFile } from "./utils/toFile.js";
import { TaskGroup } from "../core/Task/TaskGroup.js";

export const ZipFile = function (options = {}) {
    return Plugin({
        init,
        main(data, { zipFileName }) {
            return from(data).pipe(
                map((blob) => toFile(blob, zipFileName)),
                switchMap((files) => zipper(files, zipFileName))
            );
        },
        options,
        operator(context) {
            const { zipFileNumber = 3 } = this.options;
            return (source) =>
                source.pipe(
                    bufferCount(zipFileNumber),
                    switchMap((tasks) => this.TaskStarter(new TaskGroup(...tasks))),
                    switchMap((task) => from(task.$break()))
                );
        },
    });
};
