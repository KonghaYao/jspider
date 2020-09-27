/**
 * 所有格式的数据转化为 File 格式
 * @date 2020-09-17
 * @param {Array} fileList 数据数组
 * @param {Array | Object} nameList 可以使用数字为键值的对象特定修改某一个数据数组元素的名称
 * @returns {Array} 处理好的 File 数组
 */
function toFile(fileList, nameList) {
    return fileList.map((file, index) => {
        let name = nameList[index];
        if (!(file instanceof Blob)) {
            file = new File([JSON.stringify(file) || ""], name || index + ".txt");
        } else if (name || !file.name) {
            file.name = name || index + ".txt";
        }
        return file;
    });
}
export default toFile;
