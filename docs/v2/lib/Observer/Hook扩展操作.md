# Hook 函数扩展操作

Hook 是 JSpider 的 Observer 的一个函数，使用 Proxy 对函数的参数进行控制操作。灵活使用 Hook 对于爬虫的 Ajax 监控和其他一些判断操作都有作用。

## 匿名函数的代理

当我们在查看源代码的时候，会有很多函数是运行在立即执行函数内部，不能被直接获取到。但是在 debugger 时，匿名函数中的函数可以被获取，这个时候它就可以被导出和代理。

```js
//立即执行函数

(function (index) {
    let add = (i) => i++;
    let plus = (i) => add(i ** i);
    window.plus = plus;
})(i);

//首先定下 debugger 断点，并触发

add = Hook(add);
temp1 = add; // temp1就是那个藏在立即执行函数中的函数

//上面为打断状态下执行的函数

//添加监控 测试是否被 Hook 住
temp1.Func.push((args) => {
    console.log("通过参数  ", args);
    return args;
});
plus(21);
```

## XHR 监控

在进行复杂参数，或者是某些 Post 操作的时候，得知某些参数需要去查看源代码，但是要找到这些位置却比较麻烦，所以我们可以通过代理 XHR 函数来实现对 Ajax 交流的筛选和 debugger。

debugger 之后就可以直接对调用栈进行查看，从而找到原来的请求位置，方便分析 Ajax 参数加密。

```js
async function XHRwatch(urlReg, method = "get") {
    // Hook XHR函数

    let Hook = JSpider.prototype.Observer.hook;
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    XMLHttpRequest.prototype.send = Hook(XMLHttpRequest.prototype.send);

    // open 函数添加前置函数

    XMLHttpRequest.prototype.open.Func.push((args) => {
        let [type, url, ...any] = args;
        if (urlReg.test(url) && type.toLocaleLowerCase() === method) {
            window.STOP = true;

            //解析参数 并通知

            let params = Object.fromEntries(
                url
                    .split("?")[1]
                    .split("&")
                    .map((i) =>
                        i.split("=").map((pair) => decodeURIComponent(pair))
                    )
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
XHRwatch(/s/i);
```
