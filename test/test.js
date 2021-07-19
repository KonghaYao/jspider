const mitt = require('mitt');
const { iif } = require('rxjs');
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
    switchMapTo,
    exhaustMap,
} = require('rxjs/operators');
const emitter = mitt();
const pause$ = fromEventPattern((handle) => emitter.on('pause', handle));
const pauseWhile = (pauseFunc) => {
    const cache = [];
    return (source) =>
        source.pipe(
            switchMap((value) => {
                if (pauseFunc(value)) {
                    cache.push(value);
                    console.log('save ', value);
                    return EMPTY;
                } else {
                    return from([...cache, value]).pipe(tap(() => (cache.length = 0)));
                }
            }),
        );
};

const source$ = interval(300).pipe(
    pauseWhile((val) => {
        return val % 5;
    }),
    take(14),
);
const startTime = new Date().getTime();
const compare = () => Math.ceil((new Date().getTime() - startTime) / 100);
source$.subscribe((val) => console.log(compare(), val));
