import { v as validate, s as stringify, T as Task } from '../Task-ce8b0387.js';
import { c as concatMap } from '../concatMap-0d4163f6.js';
import { o as operate, O as OperatorSubscriber, m as map } from '../map-f4798e28.js';
import { p as pipe, f as from } from '../mergeMap-1cf10555.js';
import { o as of } from '../of-0c892e58.js';
import './components.js';
import '../utils/type.js';

function skipWhile(predicate) {
    return operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35 (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return stringify(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var v5 = v35('v5', 0x50, sha1);

// JSpider 内部不进行 Error 相关的处理
// 因为 Error 是在 Plugins 内部处理的，不通过 JSpider
class JSpider {
    constructor(...plugins) {
        this.plugins = plugins; // 对 plugins 判断

        this._createPipeline();
    }
    marksPath = [];
    plugins = [];
    _aboutElementIndex = -1; // 标志中断时的元素 Index
    _status = "normal";
    _tasks = [];
    _pluginsUUID; //标志走过这一条流程线的 UUID 值
    _createUUID(string) {
        return v5(string, v5.URL);
    }
    _createPipeline() {
        let UUIDCollection = [];
        let pipelineArray = this.plugins.reduce((col, plugin) => {
            // !使用 uuid 作为程序的唯一标识符，这个将用来判断数据是否经过同一个步骤

            let string = plugin.toString();
            let markUUID = this._createUUID(string); // 生成对代码的标志符
            plugin.uuid = markUUID;
            UUIDCollection.push(string);
            if (plugin.$canSkip === false) {
                col.push(plugin);
            } else {
                col.push(
                    concatMap((task) => {
                        let $source = of(task);
                        let result = task.$checkRepeat(markUUID) ? $source : $source.pipe(plugin);
                        return result;
                    }),
                    map((task) => {
                        task.$Mark(markUUID);
                        return task;
                    })
                );
            }

            return col;
        }, []);
        this._pluginsUUID = this._createUUID(JSON.stringify(UUIDCollection)); // 作为整条流水线的 UUID 证明
        console.log(this._pluginsUUID);
        this.pipeline = pipe(...pipelineArray);
    }
    apply(sourceArray) {
        console.log("开始流", sourceArray);
        return from(sourceArray)
            .pipe(
                map((message, index) => {
                    const task = new Task(message, index);
                    task._mainUUID = this._pluginsUUID;
                    this._tasks.push(task);
                    return task;
                }),
                skipWhile((task) => {
                    // 跳过已经完成的项目
                    if (task._complete && task._status === "complete" && task._completeUUID === this._pluginsUUID) {
                        console.log("跳过一个目标");
                        return true;
                    } else {
                        return false;
                    }
                }),
                this.pipeline,
                map((task) => task.$commit("complete", this._pluginsUUID))
            )
            .subscribe({
                complete() {
                    console.log("爬虫全部完成");
                },
            });
    }

    setting() {
        // 对 JSpider 进行设置
    }
    restart() {
        // 重新获取并覆盖数据
    }
    retry() {
        // 对发生错误或失败的 Task 进行重试
    }
    about() {
        // 中断事件流
    }
    report(director) {
        // 根据 director 返回信息
    }
}

export default JSpider;
