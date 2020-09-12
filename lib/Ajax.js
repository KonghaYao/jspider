import branch from "./Ajax/branch.js";

class Ajax {
    constructor(Options) {
        let { urls, options = { method: "get" }, limits = 3, time = 200, type = "test" } = Options;
        this.requestOptions = { urls, time, options, type, limits };
        this.result = [];
        console.log("载入成功");
    }
    ajax = branch;
}
export default Ajax;
