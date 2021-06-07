import { XLSX } from './xlsx.js';
import '../../tools/loader/loader.js';
import '../../tools/loader/scriptStore.js';
import '../../tools/loader/loaderFunction.js';

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
    let ArrayBuffer = XLSX.write(book, options);
    return new File([ArrayBuffer], name + "." + options.bookType);
}
function ObjectToBook(input) {
    let book = XLSX.utils.book_new();
    Object.entries(input).forEach(([sheetName, sheetArray]) => {
        let sheet = ArrayToSheet(sheetArray);
        XLSX.utils.book_append_sheet(book, sheet, sheetName);
    });
    return book;
}

// input: {sheetName1:[],sheetName2:[]}
function createExcelFile(input, fileName, XLSXOptions) {
    let { bookType = "xlsx", bookSST = true, type = "array" } = XLSXOptions || {};
    return bookToFile(ObjectToBook(input), fileName, {
        bookType,
        bookSST,
        type,
    });
}

export default createExcelFile;
