// 将在 fileList 中的非 File 转化成 File
function toFile(fileList, nameList) {
    return fileList.map((file, index) => {
        let name = nameList[index];
        if (!(file instanceof Blob)) {
            file = new File([JSON.stringify(file)], name || index + ".txt");
        } else if (name || !file.name) {
            file.name = name || index + ".txt";
        }
        return file;
    });
}
export default toFile;
