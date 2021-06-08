import components from './core/components.js';
import type from './utils/type.js';

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

// Task 的结构借鉴于 Vue 的组件写法
class Task {
    // 所有的内部方法和属性都是前缀为 _
    _index = v4();
    _status = "free";
    _createdAt = new Date();
    _updatedAt = new Date();
    _errorList = [];
    _result; // 每个中间件传出的数据
    _marks = {}; // 记录完成流程的过程标志 {UUID:pluginsResult}
    _complete = false;
    _completeUUID;
    _mainUUID;
    data = {}; // 源数据，是由用户传入经过 format 的数据

    constructor(message, UUID) {
        Object.assign(this.data, components.data());
        this.$formatMessage(message);
        this._markUUID = UUID;
    }
    $formatMessage(message) {
        let MessageType = type(message);
        if (components.format[MessageType] instanceof Function) {
            components.format[MessageType].apply(this, [message]);
        } else {
            throw new Error("format 状态错误" + this._index);
        }
    }
    // 通过 commit 更改 Task 内部的status
    $commit(status, ...payload) {
        if (components.commit[status] instanceof Function) {
            const flag = components.commit[status].apply(this, payload);
            if (flag !== false) {
                this._status = status;
                this._updatedAt = new Date();
                return flag;
            }
        } else {
            throw new Error("commit 状态错误" + this._index);
        }
    }
    $Mark(markUUID) {
        this._marks[markUUID] = this._result;
    }
    $checkRepeat(markUUID) {
        return this._marks.hasOwnProperty(markUUID);
    }
    // 数据导出和导入的接口
    $output() {
        return ["_complete", , "_completeUUID", "_mainUUID", "_index", "_status", "_createdAt", "_updatedAt", "_errorList", "_result", "_marks", "data"].reduce(
            (col, cur) => ((col[cur] = this[cur]), col),
            {}
        );
    }
}

export { Task as T, stringify as s, validate as v };
