import { toFile } from './utils/toFile.js';
import { _ as __extends, S as Subscriber } from '../Subscriber-66236423.js';
import { m as map } from '../map-94257997.js';

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /*@__PURE__*/ (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = /*@__PURE__*/ (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber));

// 在 浏览器中下载是不能够同时进行的，也就是说，如果前面的没有下载完，后面的又提交
// 会导致后面的全部失效，所以设置 Promise 下载队列
const DownloadQueue = {
    main: Promise.resolve(true),
    add(file) {
        this.main.then(() => {
            return aDownload(file);
        });
    },
};
// a 标签下载的方式貌似为同步模式（未验证）
const aDownload = function (file) {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
    console.log("%c 下载完成", "color:green");
};

const download = (task) => {
    //  获取数据为 request
    const { url, name } = task.data;
    const data = task.$commit("processing");
    const file = toFile(data, name || (typeof url === "string" ? url.replace(/[^\/]*?\//g, "") : ""));
    DownloadQueue.add(file);
    return task;
};
const Download =
    (options = {}) =>
    ($source) => {
        return $source.pipe(
            filter((task) => task._status !== "error" && task._result),
            map(download)
        );
    };

export { Download };
