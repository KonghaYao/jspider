import { v4 as uuidv4 } from 'uuid';
import { pick } from 'lodash-es';

// 装载信息的最小单元
export class Data {
    _uuid = uuidv4();
    _spiderUUID = ''; // JSpider 的实例的 UUID
    _createdAt = new Date();

    _status = 'free'; // 这个位置是为了让 Plugin 能识别的一个标识
    _updatedAt = new Date();
    _progress = new Map(); // 记录完成过的 uuid 的信息，只有在 StaticEvent.js 中才能更改
    _originData = null;
    _output = null; // 每个中间件传出的数据

    constructor(data) {
        // 当输入初始数据需要formatter时
        // ! formatter 功能不属于 Task 需要兼容的事情，而是外部需要兼容好数据的格式
        this._originData = data;
        this._output = data;
    }

    // 导入外部信息包
    $import({ _uuid, _spiderUUID, _status, _createdAt, _updatedAt, _result, _output }) {
        Object.assign(this, {
            _uuid,
            _spiderUUID,
            _status,
            _createdAt,
            _updatedAt,
            _result,
            _output,
            _originData,
            _progress,
        });
    }
    $backup() {
        return pick(this, [
            '_uuid',
            '_spiderUUID',
            '_status',
            '_createdAt',
            '_updatedAt',
            '_output',
            '_progress',
            '_originData',
        ]);
    }
    get [Symbol.toStringTag]() {
        return 'Data';
    }
}
