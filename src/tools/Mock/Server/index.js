import excelTemplate from "./excel.js";
// 在这里配置 url 和 type 信息
const Server = {
    excel: {
        url: "/fake/excel",
        type: "GET",
        template: excelTemplate,
    },
};

export { Server };
