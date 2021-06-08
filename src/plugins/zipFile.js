import { zipper } from "./JSzip/zipper.js";
import { from } from "rxjs";
import { bufferCount, mergeMap } from "rxjs/operators";
import { tasksToFiles } from "./JSzip/tasksToFiles.js";
const ZipFile =
    (options = {}) =>
    (source) => {
        let { zipName = "", $chunk = 1 } = options;
        let pipeArray = [];
        if ($chunk >= 1) pipeArray.push(bufferCount($chunk));
        return source.pipe(
            ...pipeArray,
            mergeMap((fileArray, index) => {
                return from(zipper(fileArray.map(tasksToFiles), zipName, index));
            })
        );
    };

export { ZipFile };
