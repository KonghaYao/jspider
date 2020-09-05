async function POSTwatch(urlReg) {
    window.Hook =
        window.Hook ||
        (await import("https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js").then((res) => {
            console.log("%c 载入成功", "color:green");
            return res.default;
        }));
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    XMLHttpRequest.prototype.send = Hook(XMLHttpRequest.prototype.send);
    XMLHttpRequest.prototype.open.Func.push((args) => {
        let [type, url, ...any] = args;
        if (urlReg.test(url) && type.toLocaleLowerCase() === "post") {
            window.STOP = true;
            let urlObj = new URL(url);
            let params = Object.fromEntries(urlObj.searchParams.entries());
            console.log(params);
            debugger;
        }
        return args;
    });
    XMLHttpRequest.prototype.send.Func.push((args) => {
        if (window.STOP) {
            debugger;
            window.STOP = false;
        }
        return args;
    });
}
POSTwatch(/s/i);
