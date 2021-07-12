const { Operator } = require('rxjs');
const { of, from, pipe, fromEventPattern, timer, interval } = require('rxjs');
const { map, switchMap, mergeAll, take, shareReplay, share } = require('rxjs/operators');
const center = {
    operator: map((i) => i + 1),
    operator2: map((i) => i + 100),
};
const source$ = interval(1000).pipe(
    take(10),
    switchMap((item) => {
        if (item < 5) {
            return of(item).pipe(center.operator);
        } else {
            return of(item).pipe(center.operator2);
        }
    }),
    share(),
);
source$.subscribe((i) => console.log('first ', i));
setTimeout(() => source$.subscribe((i) => console.log('  second ', i)), 1000);
