function downloadSheet(json, name) {
    json.forEach((i) => {
        Object.entries(i).forEach(([key, value]) => {
            if (value instanceof Object) {
                i[key] = JSON.stringify(value);
            }
        });
        // 处理二层数据不能够写入的问题
    });

    console.log(json);
    let newbook = XLSX.utils.book_new();
    let sheet = XLSX.utils.json_to_sheet(json);

    XLSX.utils.book_append_sheet(newbook, sheet, "爬取结果");
    console.log(newbook);
    XLSX.writeFile(newbook, name + ".xlsx", { bookType: "csv" });
}
