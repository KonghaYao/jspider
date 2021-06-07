import { m as mergeMap } from './mergeMap-1cf10555.js';
import { i as isFunction } from './map-f4798e28.js';

function concatMap(project, resultSelector) {
    return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}

export { concatMap as c };
