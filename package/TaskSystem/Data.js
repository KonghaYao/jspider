import { v4 as uuidv4 } from 'uuid';
import { pick } from 'lodash-es';

// 装载信息的最小单元
class Data {
    _uuid = uuidv4();
    _spiderUUID = ''; // JSpider 的实例的 UUID
    _createdAt = new Date();

    _status = 'free';
    _updatedAt = new Date();

    _output = null; // 每个中间件传出的数据

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
        });
    }
    $backup() {
        return pick(this, ['_uuid', '_spiderUUID', '_status', '_createdAt', '_updatedAt', '_output']);
    }
}

export { Data };
