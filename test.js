const mitt = require('mitt');
const { of, from, pipe, fromEventPattern, timer, interval } = require('rxjs');
const { map, switchMap, mergeAll, take, shareReplay, share, delay, delayWhen } = require('rxjs/operators');
const emitter = mitt();
const source$ = fromEventPattern((handle) => emitter.on('start', handle)).pipe(map((i) => i + 1));
source$.subscribe((i) => console.log(i));
Array(10)
    .fill(0)
    .forEach((i) => emitter.emit('start', i));
