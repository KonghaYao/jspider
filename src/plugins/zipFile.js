import { zipper } from "./JSzip/zipper.js";
import { from } from "rxjs";
import { bufferCount, map, mergeMap, tap } from "rxjs/operators";
import { tasksToFiles } from "./JSzip/tasksToFiles.js";

import Task from "../core/Task.js";
const ZipFile =
    (options = {}) =>
    (source) => {
        let { zipName = "", $chunk = 1 } = options;
        let pipeArray = [];

        if ($chunk >= 1) pipeArray.push(bufferCount($chunk));
        return source.pipe(
            ...pipeArray,
            mergeMap((tasksArray, index) => {
                let files = tasksArray.map(tasksToFiles);
                let zipFile = zipper(files, zipName || new Date().getTime(), index);
                return from(zipFile).pipe(
                    map((zipFile) => {
                        const newTask = new Task(
                            {
                                data: tasksArray,
                            },
                            tasksArray[0]._pluginsUUID
                        );
                        newTask.$commit("success", zipFile);
                        return newTask;
                    })
                );
            })
        );
    };
import { init } from "./JSzip/JSzip.js";
ZipFile.init = init;
export { ZipFile };