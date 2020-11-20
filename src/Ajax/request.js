import requestErr from "./requestErr.js";

/**
 * 初步封装的 fetch 操作
 * @date 2020-09-16
 * @param {String} url 单个 URL 字符串
 * @param {Object} options fetch 的请求 options
 * @returns {Promise} 返回结果
 */

function request(url, options, returnType = "") {
    // 类型检测: 判断 url 为 string 或者是 {url:string,options:OPTIONS}
    if (typeof url === "object") {
        options = { ...options, ...url.options };
        options.headers = { ...options.headers, ...url.options.headers };
        url = url.url;
    }
    //
    let result = fetch(url, options)
        .then((res) => {
            // 自动类型判断与解析
            let type = res.headers.get("content-type");

            // 根据 returnType 强制返回
            switch (returnType.toLowerCase()) {
                case "blob":
                    return res.blob();
                case "text":
                    return res.text();
                case "json":
                    return res.json();
                default:
                    //根据 content-type 判断数据
                    if (/text|html|rtf|xml/.test(type)) {
                        return res.text();
                    } else if (/json/.test(type)) {
                        return res.json();
                    } else {
                        // 默认返回 Blob 数据
                        return res.blob();
                    }
            }
        })
        .catch((err) => {
            // 错误转入错误列表中
            console.log("%c " + err, "color:red;");
            requestErr.push({ url, options });
        });
    return result;
}

export default request;
