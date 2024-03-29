/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { XLSX } from './xlsx.js';
// XLSX 通过 script 导入
function ArrayToSheet(sheetArray) {
    sheetArray.forEach((i) => {
        Object.entries(i).forEach(([key, value]) => {
            if (value instanceof Object) {
                i[key] = JSON.stringify(value);
            }
        });
        // 处理二层数据不能够写入的问题
    });
    return XLSX.utils.json_to_sheet(sheetArray);
}

function bookToFile(book, name, options) {
    const ArrayBuffer = XLSX.write(book, options);
    return new File([ArrayBuffer], `${name}.${options.bookType}`);
}
function ObjectToBook(input) {
    const book = XLSX.utils.book_new();
    Object.entries(input).forEach(([sheetName, sheetArray]) => {
        const sheet = ArrayToSheet(sheetArray);
        XLSX.utils.book_append_sheet(book, sheet, sheetName);
    });
    return book;
}

// input: {sheetName1:[],sheetName2:[]}
function createExcelFile(input, fileName, XLSXOptions) {
    const { bookType = 'xlsx', bookSST = true, type = 'array' } = XLSXOptions || {};
    return bookToFile(ObjectToBook(input), fileName, {
        bookType,
        bookSST,
        type,
    });
}
export { createExcelFile };
