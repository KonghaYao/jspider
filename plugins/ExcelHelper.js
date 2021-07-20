/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { createExcelFile } from './ExcelHelper/createExcelFile.js';
import { Plugin } from '../src/Pipeline/PluginSystem.js';
import { init } from './ExcelHelper/xlsx.js';
// 未完成 导入 XLSX 的 Promise 到流的转变

// ExcelHelper 是将 Object => Book => File 用于下载的一个库
export const ExcelHelper = function (formatter, options = {}) {
    return Plugin({
        init,
        options,
        main(data) {
            const { fileName = 'result', XLSXOptions = {} } = this.options;
            if (formatter instanceof Function) data = formatter(data);
            return createExcelFile(data, `${fileName}-${new Date().getTime()}`, XLSXOptions);
        },
    });
};
