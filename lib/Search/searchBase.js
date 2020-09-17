/**
 * 对象搜索核心函数
 * @date 2020-09-17
 * @param {Array} arr 一个由对象生成的二维数组
 * @param {Regexp} name 搜索的正则表达式
 * @param {Number} deep=5 最大搜索深度
 * @returns {Array} 返回搜索结果
 */
function searchBase(arr, name, deep = 5) {
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

            let type = Object.prototype.toString.call(value).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
            switch (type) {
                //
                //字符串和函数只需要对文字部分分析就可以了
                case "String":
                case "Function":
                    return name.test(value) ? [...all, i] : all;
                case "Number":
                    return name.test(value) ? [...all, i] : all;

                //数组 和 对象分开
                case "Array":
                    var dd = searchBase(Object.entries(value), name, deep).reduce((a, b) => {
                        let num = parseInt(b[0]) - a.length;
                        [...Array(num)].forEach(() => a.push("***"));
                        return [...a, b[1]];
                    }, []);
                    return dd.length ? [...all, [key, dd]] : all;
                case "Object":
                    var bb = Object.fromEntries(searchBase(Object.entries(value), name, deep));
                    return Object.keys(bb).length === 0 ? all : [...all, [key, bb]];
                //
                //跳过其他类型
                default:
                    return all;
            }
        }
    }, []);
}
export default searchBase;
