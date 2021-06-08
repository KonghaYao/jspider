import { zipper } from './JSzip/zipper.js';
import { tasksToFiles } from './JSzip/tasksToFiles.js';
import { T as Task } from '../Task-f41dffa5.js';
import { init } from './JSzip/JSzip.js';
import { b as bufferCount } from '../bufferCount-cc50a06c.js';
import { m as mergeMap } from '../mergeMap-063b7a69.js';
import { f as from } from '../from-87624c8d.js';
import { m as map } from '../map-94257997.js';
import './utils/toFile.js';
import '../core/components.js';
import '../utils/type.js';
import '../tools/loader/loader.js';
import '../tools/loader/scriptStore.js';
import '../tools/loader/loaderFunction.js';
import '../Subscriber-66236423.js';

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
ZipFile.init = init;

export { ZipFile };
