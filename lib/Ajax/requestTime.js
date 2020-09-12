import request from "./request.js";
// 定时请求
function requestTime(arr, options, msNum = 100) {
    return Promise.all(
        arr.map(
            (url, index) =>
                new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        let res = await request(url, options);
                        console.log("Time: " + new Date().getTime());
                        resolve(res);
                    }, index * msNum);
                })
        )
    );
}
export default requestTime;
