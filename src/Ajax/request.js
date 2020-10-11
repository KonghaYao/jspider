import requestErr from "./requestErr.js";

/**
 * 初步封装的 fetch 操作
 * @date 2020-09-16
 * @param {String} url 单个 URL 字符串
 * @param {Object} options fetch 的请求 options
 * @returns {Promise} 返回结果
 */
function request(url, options) {
    if (typeof url === "object") {
        options = { ...options, ...url.options };
        options.headers = { ...options.headers, ...url.options.headers };
        url = url.url;
    }
    return fetch(url, options)
        .then((res) => {
            let type = res.headers.get("content-type");
            if (/text|html|rtf|xml/.test(type)) {
                return res.text();
            } else if (/json/.test(type)) {
                return res.json();
            } else {
                return res.blob();
            }
        })
        .then((res) => res)
        .catch((err) => {
            console.log("%c " + err, "color:red;");
            // 错误转入错误列表中
            requestErr.push({ url, options });
        });
}
export default request;
