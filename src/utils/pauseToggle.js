import { noop, Observable } from 'rxjs';

export function pauseToggle(openings, closings) {
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
                // 输出所有的 buffer
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
