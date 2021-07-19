export const pauseWhile = (pauseFunc) => {
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
