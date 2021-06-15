import concurrent from "../utils/concurrent.js";
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
const request = (task, RequestOptions) => {
    const { returnType = "json" } = RequestOptions;
    //  获取数据为 request
    const { url, options } = task.$commit("start");
    console.log("- 爬取 ", url);
    return fetch(url, options)
        .then((res) => {
            return Format(res, returnType);
        })
        .then((res) => {
            task.$commit("success", res);
            return task;
        })
        .catch((err) => {
            task.$commit("error", err);
            return task;
        });
};
const Request = (options) => {
    return ($source) => {
        options = options || {};
        const { $delay = 200, $count = 3, RequestOptions = {} } = options;
        return $source.pipe(concurrent((task) => request(task, RequestOptions), { $delay, $count }));
    };
};
export { Request };
