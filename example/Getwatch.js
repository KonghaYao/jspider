/**
 * XMLHttpRequest 中的 GET 请求拦截
 * @date 2020-09-05
 * @param {RegExp} urlReg 匹配 url 的正则表达式，匹配到会进入 debugger
 */

// 需要单独引入 Hook 模块
async function GETwatch(urlReg) {
    window.Hook =
        window.Hook ||
        (await import("https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js").then((res) => {
            console.log("%c 载入成功", "color:green");
            return res.default;
        }));
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    XMLHttpRequest.prototype.open.Func.push((args) => {
        let [type, url, ...any] = args;
        if (urlReg.test(url) && type.toLocaleLowerCase() === "get") {
            let urlObj = new URL(url);
            let params = Object.fromEntries(urlObj.searchParams.entries());
            console.log(params);
            debugger;
        }
        return args;
    });
}
GETwatch(/getinfo/i);
