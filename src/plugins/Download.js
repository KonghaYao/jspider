import { map } from "rxjs/operators";
const core = (task) => {
    //  获取数据为 request
    const { url, options, data } = task.$commit("processing");
};
export default (options = {}) =>
    ($source) => {
        return $source.pipe(map(core));
    };
