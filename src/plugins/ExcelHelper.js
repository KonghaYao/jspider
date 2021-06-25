import createExcelFile from "./ExcelHelper/createExcelFile.js";
import { Plugin } from "../core/PluginSystem.js";
import { init } from "./ExcelHelper/xlsx.js";
// 未完成 导入 XLSX 的 Promise 到流的转变

// ExcelHelper 是将 Object => Book => File 用于下载的一个库
export const ExcelHelper = function (formatter, options = {}) {
    return Plugin({
        init,
        options,
        main: function (data) {
            let { fileName = "爬取结果", XLSXOptions = {} } = this.options;
            if (formatter instanceof Function) data = formatter(data);
            return createExcelFile(data, fileName, XLSXOptions);
        },
    });
};
