// 初步封装的 fetch 操作
function request(url, options) {
    if (typeof url === "object") {
        options = { ...options, ...url.options };
        options.headers = { ...options.headers, ...url.options.headers };
        url = url.url;
    }
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((res) => res.blob())
            .then((res) => {
                if (/text|xml/.test(res.type)) {
                    resolve(res.text());
                } else if (/json/.test(res.type)) {
                    resolve(JSON.parse(res.text()));
                } else {
                    resolve(res);
                }
            })
            .catch((err) => reject(err));
    });
}
export default request;
