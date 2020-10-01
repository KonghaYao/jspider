import request from "./request.js";
import sleep from "./sleep.js";

async function pipe(url, options = {}, func, time = 0) {
    let end = true;
    let all = [url, options];
    let collection = [];

    for (let i = 0; end; i++) {
        console.log(i);
        let res = await request(all[0], { ...options, ...all[1] })
            .then((res) => {
                collection.push(res);
                // 函数返回值作为请求参数。
                return func(res, [i]);
            })
            .then((res) => sleep(res, time));
        [end, all] = res;
    }

    console.log("完成");
    return collection;
}

export default pipe;
