import { s as scheduleArray, i as internalFromArray, a as popScheduler } from './mergeMap-1cf10555.js';

function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return scheduler ? scheduleArray(args, scheduler) : internalFromArray(args);
}

export { of as o };
