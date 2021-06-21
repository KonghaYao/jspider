import iframe from "./window-default.json";
// iframe 是所有的 window 对象下稳定的属性名
// !若是使用 iframe 标签的属性来得到 window 的自带属性，遇到不能使用 iframe 的网站就会失效
// ! 所以使用了这种方式。

/**
 * 全局变量展示
 * @date 2020-09-17
 * @description 将 window 和 上面引入的 iframe 对象做了比较
 * @returns {Object} 返回 window 的属性和对象
 */
import { difference, pick } from "lodash-es";
export function $GlobalVars() {
    // 通过比较得出window上的变量
    const diff = difference(Object.keys(window), iframe);
    return pick(window, diff);
}
