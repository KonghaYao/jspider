import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';

const TaskState = types.enumeration('TaskState', ['free', 'pending', 'complete', 'error', 'destroyed']);

const pluginOutput = types.custom({
    name: 'pluginOutput',
    fromSnapshot(value) {
        return value;
    },
    toSnapshot(value) {
        return value;
    },
    isTargetType(value) {
        return true;
    },
    getValidationMessage(value) {
        return '';
    },
});
const anyType = types.custom({
    name: 'any',
    fromSnapshot(value) {
        return value;
    },
    toSnapshot(value) {
        return value;
    },
    isTargetType() {
        return true;
    },
    getValidationMessage() {
        return '';
    },
});
function init(_spiderUUID) {
    return {
        _uuid: '',
        _spiderUUID, // JSpider 的实例的 UUID
        _createdAt: new Date(),

        _status: 'free', // 这个位置是为了让 Plugin 能识别的一个标识
        _updatedAt: new Date(),
        _progress: {
            a: {
                uuid: '347847328',
                state: 'free',
                err: undefined,
                output: null,
            },
        }, // 记录完成过的 uuid 的信息，只有在 StaticEvent.js 中才能更改
        _originData: null,
        _output: null, // 每个中间件传出的数据
    };
}
const PluginResult = types.model({
    uuid: types.string,
    state: TaskState,
    err: types.maybe(types.string),
    output: types.maybe(pluginOutput),
});
const Data = types
    .model({
        _uuid: types.string,
        _spiderUUID: types.string, // JSpider 的实例的 UUID
        _createdAt: types.Date,

        _status: 'free', // 这个位置是为了让 Plugin 能识别的一个标识
        _updatedAt: types.Date,
        _progress: types.map(PluginResult), // 记录完成过的 uuid 的信息，只有在 StaticEvent.js 中才能更改
        _originData: types.maybe(anyType),
        _output: types.maybe(anyType), // 每个中间件传出的数据
    })
    .actions((self) => {
        return {
            $backup() {
                return getSnapshot(self);
            },
            $import(backup) {
                return applySnapshot(backup);
            },
        };
    });
const store = Data.create({ a: 1, ...init('123232') });
console.log('开始');
console.log(store);
