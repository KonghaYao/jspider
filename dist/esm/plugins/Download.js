import { o as operate, O as OperatorSubscriber, m as map } from '../map-f4798e28.js';

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

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
const aDownload = function (file) {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
    console.log("%c 完成", "color:green");
};
function toFile(data, name) {
    if (data instanceof File) return data;
    if (data instanceof Blob) {
        data.name = name;
        return data;
    }
    return new File([JSON.stringify(data)], name);
}
const download = (task) => {
    //  获取数据为 request
    const { url, name } = task.data;
    const data = task.$commit("processing");
    const file = toFile(data, name || url.replace(/[^\/]*?\//g, ""));
    DownloadQueue.add(file);
};
const Download =
    (options = {}) =>
    ($source) => {
        return $source.pipe(
            filter((task) => task.$status !== "error" && task.$result),
            map(download)
        );
    };

export { Download };
