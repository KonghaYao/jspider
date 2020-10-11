import request from "./request.js";
import sleep from "./sleep.js";

async function pipe(url, options = {}, func, time = 0) {
    let end = true;
    let all = [url, options];
    let collection = [];

    console.group("%c 请求组", "color:green");
    for (let i = 0; end; i++) {
        let res = await request(all[0], { ...options, ...all[1] })
            .then((res) => {
                console.log(`%c ${i} 完成`, "color:green;");
                collection.push(res);
                // 函数返回值作为请求参数。
                return func(res, [i]);
            })
            .then((res) => sleep(res, time));
        [end, all] = res;
    }
    console.groupEnd("%c 完成", "color:green");

    return collection;
}

export default pipe;
