const { of, from, pipe, fromEventPattern, timer, interval } = require('rxjs');
const { map, switchMap, mergeAll, take, shareReplay, share, delay, delayWhen } = require('rxjs/operators');

const source$ = from([10, 20, 30]).pipe(delayWhen((index) => timer(index * 100)));

const trigger$ = interval(1000).pipe(delayWhen(() => source$));
trigger$.subscribe((i) => console.log(i));
