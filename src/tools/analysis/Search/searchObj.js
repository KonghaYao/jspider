import getType from "../../../utils/type.js";
/**
 * 搜索对象内深度搜索符合正则表达式的对象键或值
 * @date 2020-09-17
 * @param {Array} arr 一个由对象生成的二维数组
 * @param {Regexp} name 搜索的正则表达式
 * @param {Number} deep=5 最大搜索深度
 * @returns {Array} 返回搜索结果
 */
function searchObj(arr, name, deep = 5, keepUnknown = false) {
    // 深度检测
    if (!deep--) {
        console.log("%c 触及低端不再下探", "color:green");
        return [];
    }

    return arr.reduce((all, i) => {
        let [key, value] = i;
        //判断 key 中是否有符合项
        if (name.test(key)) {
            return [...all, i];
        } else {
            //判断数据类型 分类操作

            let type = getType(value);
            switch (type) {
                //字符串和函数只需要对文字部分分析就可以了
                case "string":
                case "function":
                case "number":
                    return name.test(value) ? [...all, i] : all;
                //数组 和 对象分开
                case "array":
                    var arr1 = searchBase(Object.entries(value), name, deep).reduce((a, b) => {
                        let num = parseInt(b[0]) - a.length;
                        [...Array(num)].forEach(() => a.push("***"));
                        return [...a, b[1]];
                    }, []);
                    return arr1.length ? [...all, [key, arr1]] : all;
                case "object":
                    var arr = Object.fromEntries(searchBase(Object.entries(value), name, deep));
                    return Object.keys(arr).length === 0 ? all : [...all, [key, arr]];
                //跳过其他类型
                default:
                    return keepUnknown ? null : all;
            }
        }
    }, []);
}
export { searchObj };
