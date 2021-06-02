import createExcelFile from "./ExcelHelper/createExcelFile.js";
import { map, delayWhen } from "rxjs/operators";
import { load$ } from "../tools/loader.js";

// 未完成 导入 XLSX 的 Promise 到流的转变
export default (formatter, options) => ($source) => {
    return $source.pipe(
        delayWhen(() => load$("xlsx")),
        map((task) => {
            let { name = "爬取结果", XLSXOptions = {} } = options || {};
            let data = task.$commit("processing");
            if (formatter) data = formatter(data);
            let result = createExcelFile(data, name, XLSXOptions);
            task.$commit("success", result);
            return task;
        })
    );
};
