import { map, filter } from "rxjs/operators";
import { toFile } from "./utils/toFile.js";
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
