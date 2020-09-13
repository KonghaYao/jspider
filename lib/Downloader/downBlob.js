// 下载中心
function downBlob(fileList) {
    fileList.forEach((blob) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = blob.name;
        a.click();
        a.remove();
        console.log("%c 完成", "color:green");
    });
}
export default downBlob;
