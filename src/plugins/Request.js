import concurrent from "../utils/concurrent.js";
const request = (task) => {
    //  获取数据为 request
    const { url, options } = task.$commit("processing");

    return fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
            task.$commit("stateChange", res);
            return task;
        })
        .catch((err) => {
            task.$commit("error", err);
            return task;
        });
};
export default (options = {}) =>
    ($source) => {
        const { $delay = 200, $count = 3 } = options;
        return $source.pipe(concurrent(request, { $delay, $count }));
    };
