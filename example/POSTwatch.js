/**
 * 拦截 XHR POST 请求
 * @date 2020-09-10
 * @param {Regexp} urlReg 匹配到后会进入 debugger
 */
async function POSTwatch(urlReg) {
    // Hook XHR函数
    window.Hook =
        window.Hook ||
        (await import("https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js").then((res) => {
            console.log("%c 载入成功", "color:green");
            return res.default;
        }));
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    XMLHttpRequest.prototype.send = Hook(XMLHttpRequest.prototype.send);

    //================ 加入函数 ===========================//
    // open 函数添加前置函数
    XMLHttpRequest.prototype.open.Func.push((args) => {
        let [type, url, ...any] = args;
        if (urlReg.test(url) && type.toLocaleLowerCase() === "post") {
            window.STOP = true;

            //解析参数 并发出
            let params = Object.fromEntries(
                url
                    .split("?")[1]
                    .split("&")
                    .map((i) => i.split("=").map((pair) => decodeURIComponent(pair)))
            );
            console.log(params);
            debugger;
        }
        return args;
    });

    // send 函数添加前置函数
    XMLHttpRequest.prototype.send.Func.push((args) => {
        if (window.STOP) {
            debugger;
            window.STOP = false;
        }
        return args;
    });
}
POSTwatch(/s/i);
