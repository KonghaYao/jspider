// 每个 Task 拥有的静态事件
// 这些事件一般通过 $commit(eventName,payload) 进行执行
// ! this 被绑定为 Task 的实例
export const staticEvent = {
    start(UUID) {
        this._status = 'busy';
        // ! 这里会有一个清空这个 key 的 value 的情况，这是因为 start 是强制的
        this._progress.set(UUID, { process: 'start' });

        return this._output || this._originData;
    },
    success(output, UUID) {
        this._status = 'free';
        this._progress.set(UUID, { process: 'success', output });
        this._output = output;
    },
    complete(UUID) {
        this._status = 'complete';
    },
    error(err, UUID) {
        this._status = 'error';
        this._progress.set(UUID, { process: 'error', err });
    },
};
