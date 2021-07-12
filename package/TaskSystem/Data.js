import { v4 as uuidv4 } from 'uuid';
import { pick, key } from 'lodash-es';

// 装载信息的最小单元

//! 需要进行 backup 的属性都放置在 Super 里面
//! 不需要的直接在类的内部申明
export class Data {
    static backupProperty = []; // 备份数组
    static Super() {
        // 需要备份的属性都初始化在这里
        const result = {
            _uuid: uuidv4(),
            _spiderUUID: '', // JSpider 的实例的 UUID
            _createdAt: new Date(),

            _status: 'free', // 这个位置是为了让 Plugin 能识别的一个标识
            _updatedAt: new Date(),
            _progress: new Map(), // 记录完成过的 uuid 的信息，只有在 StaticEvent.js 中才能更改
            _originData: null,
            _output: null, // 每个中间件传出的数据
        };

        // 初始化 property 字符串 数组
        if (Data.backupProperty.length !== 0) Data.backupProperty = key(result);
        return result;
    }
    constructor(data) {
        Object.assign(this, Data.Super());
        // ! formatter 功能不属于 Task 需要兼容的事情，而是外部需要兼容好数据的格式
        this._originData = data;
        this._output = data;
    }

    // 导入外部信息包
    $import(taskBackup) {
        // 保证仅仅是允许的属性进行注入
        Object.assign(this, pick(taskBackup, Data.backupProperty));
    }
    $backup() {
        // 导出允许的属性
        return pick(this, Data.backupProperty);
    }
    get [Symbol.toStringTag]() {
        return 'Data';
    }
}
