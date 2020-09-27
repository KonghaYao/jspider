/**
 * 拦截 XHR请求
 * @description 单独导入 Hook 模块，并拦截 XHR 请求
 * @date 2020-09-27
 * @param {Regexp} urlReg 匹配到后会进入 debugger
 */
async function XHRwatch(urlReg, method = "get") {
    // Hook XHR函数

    let Hook = JSpider.prototype.hook;
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    XMLHttpRequest.prototype.send = Hook(XMLHttpRequest.prototype.send);

    //================ 加入函数 ===========================//

    // open 函数添加前置函数
    XMLHttpRequest.prototype.open.Func.push((args) => {
        let [type, url] = args;

        // 相对位置变绝对位置
        if (!/^http/.test(url)) {
            let a = document.createElement("a");
            a.href = url;
            url = a.href;
        }
        console.log("XHR拦截 open", [url]);
        if (urlReg.test(url) && type.toLowerCase() === method) {
            window.STOP = true;
            //解析参数 并发出
            try {
                let params = Object.fromEntries(
                    url
                        .split("?")[1]
                        .split("&")
                        .map((i) => i.split("=").map((pair) => decodeURIComponent(pair)))
                );
                console.log(params);
            } catch (err) {}
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
export default XHRwatch;
