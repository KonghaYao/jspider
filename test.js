const mitt = require('mitt');
const { EMPTY } = require('rxjs');
const { of, from, pipe, fromEventPattern, timer, interval } = require('rxjs');
const {
    map,
    switchMap,
    mergeAll,
    take,
    shareReplay,
    share,
    delay,
    delayWhen,
    bufferCount,
    tap,
    concatAll,
    concatMap,
    mergeMap,
    bufferWhen,
    buffer,
    bufferToggle,
} = require('rxjs/operators');
const emitter = mitt();
const lastTime = 0;
const source$ = fromEventPattern((handle) => emitter.on('start', handle)).pipe(bufferCount(3));

source$.subscribe((i) => console.log(new Date().getTime(), i));

[...Array(10).keys()].forEach((i) => emitter.emit('start', i * 100));
