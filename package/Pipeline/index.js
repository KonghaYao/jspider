const { fromEventPattern } = require('rxjs');

export class Pipeline {
    constructor() {}

    // 对提供的 EventHub 进行流式监控
    inputSource(emitter) {
        return fromEventPattern(
            function (handle) {
                emitter.on('start', handle);
            },
            function (handle) {
                emitter.off('start', handle);
            },
        );
    }
    outputResult() {}
}
