// 使用 deno 测试一些 rxjs 相关的东西
import mitt from 'mitt';
import { EMPTY, iif, of, from, pipe, fromEventPattern, timer, interval, Observable, noop, Subscription } from 'rxjs';
import {
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
} from 'rxjs/operators';
const emitter = mitt();
const pause$ = fromEventPattern((handle) => emitter.on('pause', handle));

function pauseToggle(openings, closings) {
    return (observable) =>
        new Observable((subscriber) => {
            const buffers = new Set();
            let closingSubscription = false;
            const subscription = observable.subscribe(
                (value) => {
                    closingSubscription ? buffers.add(value) : subscriber.next(value);
                },
                noop,
                () => {
                    buffers.forEach((item) => subscriber.next(item));
                    subscriber.complete();
                },
            );

            const openingSubscription = openings.subscribe(() => {
                const emitBuffer = () => {
                    buffers.forEach((item) => subscriber.next(item));
                    buffers.clear();
                    closingSubscription.unsubscribe();
                    closingSubscription = false;
                };
                closingSubscription = closings.subscribe(emitBuffer);
            });
            return () => {
                buffers.clear();
                subscription.unsubscribe();
                openingSubscription.unsubscribe();
                if (closingSubscription) closingSubscription.unsubscribe();
            };
        });
}
const source$ = interval(100).pipe(take(14), pauseToggle(interval(500), interval(200)));

const startTime = new Date().getTime();
const compare = () => Math.ceil((new Date().getTime() - startTime) / 100);
source$.subscribe((val) => console.log(compare(), val));
