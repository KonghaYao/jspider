class TaskGroup {
    constructor(array) {}
}
class DataChunk extends Array {
    constructor(...args) {
        super(...args);
    }
}
import { v4 as uuidv4 } from 'uuid';
class Task {
    _index = uuidv4();
    _status = 'free';
    _createdAt = new Date();
    _updatedAt = new Date();
    _errorList = [];
    _dataChunk = new DataChunk(); // 每个中间件传出的数据
    _output; // 每个中间件传出的数据
    _spiderUUID = ''; // JSpider 的实例的 UUID
    constructor() {}

    destroy() {}
}

class Pipeline {}
export class JSpider {
    constructor(URLArray, config) {}
    start() {}
    stop() {}

    pipeline() {}
}
