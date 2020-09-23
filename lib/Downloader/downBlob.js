/**
 * 下载器的核心函数
 * @date 2020-09-17
 * @param {Array} fileList 里面的元素必须为 Blob，Blob 内可以赋值 name 属性
 */
function downBlob(fileList) {
    fileList.forEach((blob) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = blob.name;
        a.click();
        a.remove();
        console.log("%c 完成", "color:green");
    });
    return true;
}
export default downBlob;
