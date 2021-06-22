import { concurrent } from "../utils/concurrent.js";
const Format = function (res, returnType) {
    let type = res.headers.get("content-type") || "";
    // 根据 returnType 强制返回
    if (!returnType || returnType === "auto") {
        // 自动判断类型并解析
        if (/text|html|rtf|xml/.test(type)) {
            return res.text();
        } else if (/json/.test(type)) {
            return res.json();
        } else if (/arrayBuffer/.test(type)) {
            return res.arrayBuffer();
        } else {
            // 默认返回 Blob 数据 配合 node端 的buffer
            return res.buffer ? res.buffer() : res.blob();
        }
    } else if (returnType) {
        return res[returnType]();
    } else {
        return res.json();
    }
};

import consola from "consola";
const request = (task, RequestOptions) => {
    const { returnType = "json" } = RequestOptions;
    //  获取数据为 request
    const { url, options } = task.$commit("start");
    consola.start("- 爬取 ", url);
    return fetch(url, options)
        .then((res) => {
            return Format(res, returnType);
        })
        .then((res) => {
            consola.success(url + " 爬取成功");
            task.$commit("success", res);
            return task;
        })
        .catch((err) => {
            throw err;
        });
};
// 在超过重试次数时，进行的操作
const HandleError = function (err, err$) {
    throw err;
};
const Request =
    ({ delay = 200, buffer = 3, retry = 3, handleError = null, RequestOptions = {} } = {}) =>
    ($source) => {
        return $source.pipe(concurrent((task) => request(task, RequestOptions), { delay, buffer, retry, handleError: handleError || HandleError }));
    };

export { Request };
