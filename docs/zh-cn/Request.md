# Request 请求库

## 简介

Request Plugin 是用于产生批量请求的库，这个库的逻辑是将输入的所有 URLObject 对象进行请求操作，同时通过参数控制并发数和重试逻辑，保证爬取成功。

## 使用

1. 简单请求

> 温馨提示，您可以直接打开 DevTools 复制这段代码进行查看。

```js
let { Request } = JSpider.plugins;
let Plugin = JSpider.Plugin;

let spider = new JSpider(
    Request(),
    Plugin((data) => {
        console.log("This is the response data", data);
        return data;
    })
);

// 载入您的 URLS 将会进行爬取
spider.apply(["/fake/excel"]);
```

2. 控制参数

```js
// 这里需要模拟发出很多 url 请求
let fakeURLs = [...Array(10).keys()].map(() => "/fake/excel");
fakeURLs.push("./someErrorURL");

let { Request } = JSpider.plugins;
let Plugin = JSpider.Plugin;

let spider = new JSpider(
    Request({
        delay: 2000, // 每一批请求等待时间
        buffer: 3, // 同时请求数
        retry: 3, // 如果请求失败的最大重试次数
        handleError() {
            console.log("这个请求失败了，所以我们放弃了它");
            return false;
        }, // 如果重试失败后的操作
        returnType: "blob" //对请求完成后的数据进行 blob 的方式格式化
    }),
    Plugin((data) => {
        console.log(data);
        return data;
    })
);

// 载入您的 URLS 将会进行爬取
spider.apply(fakeURLs);
```
