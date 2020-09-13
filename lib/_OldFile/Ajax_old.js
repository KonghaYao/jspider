class Ajax {
    constructor(Options) {
        let { urls, options = { method: "get" }, limits = 3, time = 200, type = "test" } = Options;
        this.requestOptions = { urls, time, options, type, limits };
        this.result = [];
        console.log("载入成功");
    }
    // 初始化函数
    async ajax(requestOptions) {
        let { urls, time, options, type, limits } = { ...this.requestOptions, ...requestOptions };
        switch (type) {
            case "time":
                this.result = await this.requestTime(urls, options, time);
                return this.result;
            case "sync":
                console.log("%c 并发", "color:green");
                this.result = await this.requestSync(urls, options, limits);
                console.log("%c 请求完成", "color:green");
                return this.result;
            case "async":
                console.log("%c 异步队列", "color:green");
                this.result = await this.requestSync(urls, options, 1);
                console.log("%c 请求完成", "color:green");
                return this.result;
            default:
                console.log("%c 测试", "color:green");
                return await Promise.all(
                    [0, 1, 2].map((i) => {
                        if (urls[i]) {
                            return this.request(urls[i], options);
                        }
                    })
                );
        }
    }

    // 定时请求
    requestTime(arr, options, msNum = 100) {
        return Promise.all(
            arr.map(
                (url, index) =>
                    new Promise((resolve, reject) => {
                        setTimeout(async () => {
                            let res = await this.request(url, options);
                            console.log("Time: " + new Date().getTime());
                            resolve(res);
                        }, index * msNum);
                    })
            )
        );
    }

    // 并发请求处理
    requestSync(urls, options = {}, limits = 3) {
        //封装好函数
        let func = async (arr) => {
            let [urls, options, result] = arr;
            let group = urls.splice(0, limits);
            let res = await Promise.all(group.map((url) => this.request(url, options)));
            console.log(`${limits} 个已完成` + new Date().getTime());
            result.push(res);
            return [urls, options, result];
        };

        //定义爬取次数
        let num = Math.ceil(urls.length / limits);

        // compose函数按序执行
        return Array(num)
            .fill(func)
            .reduce((next, current) => {
                return next.then(current);
            }, Promise.resolve([urls, options, []]))
            .then((res) => res.pop());
    }

    // 初步封装的 fetch 操作
    request(url, options) {
        if (typeof url === "object") {
            options = url.options;
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
}
export default Ajax;