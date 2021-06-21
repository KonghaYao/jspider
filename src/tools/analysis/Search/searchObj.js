import getType from "../../../utils/type.js";

const TypeMap = {
    RE: "",
    StringFunction(all, key, value, key_value) {
        if (this.RE.test(value + "")) all.push(key_value);
        return all;
    },

    Array(all, key, value) {
        var arr = searchObj(Object.entries(value), this.RE);

        const Value = arr.reduce((final, [k, v]) => {
            final[parseInt(k)] = v;
            return final;
        }, []);
        if (arr.length) all.push([key, Value]);

        return all;
    },
    Function(all, key, value) {
        let entries = searchObj(Object.entries(value), this.RE);
        if (entries.length) all.push([key, Object.assign(value, Object.fromEntries(entries))]);
        return all;
    },
    Object(all, key, value) {
        let entries = searchObj(Object.entries(value), this.RE);
        if (entries.length) all.push([key, Object.fromEntries(entries)]);

        return all;
    },
};
TypeMap.Number = TypeMap.StringFunction;
TypeMap.String = TypeMap.StringFunction;
/**
 * 搜索对象内深度搜索符合正则表达式的对象键或值
 * @date 2020-09-17
 * @param {Array} arr 一个由对象生成的二维数组
 * @param {Regexp} RE 搜索的正则表达式
 * @param {Number} deep=5 最大搜索深度
 * @returns {Array} 返回搜索结果
 */
function searchObj(arr, RE, keepUnknown = false) {
    return arr.reduce((all, key_value) => {
        const [key, value] = key_value;
        //判断 key 中是否有符合项
        if (RE.test(key)) {
            return [...all, key_value];
        } else {
            //判断数据类型 分类操作
            TypeMap.RE = RE;
            let type = getType(value);
            if (TypeMap.hasOwnProperty(type)) {
                return TypeMap[type](all, key, value, key_value);
            } else {
                return keepUnknown ? [all, key_value] : all;
            }
        }
    }, []);
}
export { searchObj };
