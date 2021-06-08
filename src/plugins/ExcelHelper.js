import createExcelFile from "./ExcelHelper/createExcelFile.js";
import { map } from "rxjs/operators";
// 未完成 导入 XLSX 的 Promise 到流的转变
const ExcelHelper = (formatter, options) => ($source) => {
    return $source.pipe(
        map((task, index) => {
            let { name = "爬取结果", XLSXOptions = {} } = options || {};
            let data = task.$commit("processing");
            if (formatter) data = formatter(data);
            let result = createExcelFile(data, name, XLSXOptions);
            task.$commit("success", result);
            return task;
        })
    );
};
import { init } from "./ExcelHelper/xlsx.js";
ExcelHelper.init = init;
export { ExcelHelper };
