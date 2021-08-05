// 使用 deno 测试一些 rxjs 相关的东西
import mitt from 'mitt';
import { AsyncSubject } from 'rxjs';
import { bindCallback } from 'rxjs';
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

function a(callback) {
    callback(a);
}
const source$ = bindCallback(a);
const startTime = new Date().getTime();
const compare = () => Math.ceil((new Date().getTime() - startTime) / 100);
source$.subscribe((val) => console.log(compare(), val));
