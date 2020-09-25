// 需要返回 Promise 的函数的代理
fetch = JSpider.prototype.hook(fetch, true);
fetch.Func.push((args) => {
    console.log("执行前使用", args);
    return ["/"];
});
fetch.afterFunc.push((res) => {
    console.log("函数结果拦截成功", res);
    return { text: () => "不给看" };
});
let a = await fetch("", {}).then((res) => {
    console.log(res);
    return res.text();
});
console.log("%c " + a, "color: red");

// 不需要 Promise 的函数的代理
function other(...arr) {
    return arr.reduce((a, b) => a + b);
}
other = JSpider.prototype.hook(other);
other.Func.push((args) => {
    console.log("%c 我看到了参数", args);
    args.push(100);
    return args;
});
other.afterFunc.push((res) => "我添加了这一行字:" + res);
let result = other(1, 2, 3, 4);
console.log("获得的最后返回值", result); //返回110
