import createExcelFile from './ExcelHelper/createExcelFile.js';
import { init } from './ExcelHelper/xlsx.js';
import { m as map } from '../map-f4798e28.js';
import '../tools/loader/loader.js';
import '../tools/loader/scriptStore.js';
import '../tools/loader/loaderFunction.js';

// 未完成 导入 XLSX 的 Promise 到流的转变
const ExcelHelper = (formatter, options) => ($source) => {
    return $source.pipe(
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
ExcelHelper.init = init;

export { ExcelHelper };
