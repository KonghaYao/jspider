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
    bufferTime,
    takeUntil,
} = require('rxjs/operators');
const emitter = mitt();
const lastTime = 0;
const stopFlow = fromEventPattern((handle) => emitter.on('stopFlow', handle));
const source$ = fromEventPattern((handle) => emitter.on('start', handle)).pipe(
    bufferTime(1000, undefined, 3),
    takeUntil(stopFlow),
);

source$.subscribe((i) => console.log(new Date().getTime(), i));

[...Array(10).keys()].forEach((i) => emitter.emit('start', i * 100));

setTimeout(() => {
    emitter.emit('stopFlow');
}, 4000);
