// iframe 是所有的 window 对象下稳定的属性名
import iframe from "./window-default.js";
// ！ 若是使用 iframe 标签的属性，遇到不能使用 iframe 的网站就会失效
// ！ 所以使用了这种方式。
// 全局变量 和 函数 使用了比较的方式
function Globals() {
    let diff = Object.entries(window).filter((prop) => !iframe.includes(prop[0]));
    return Object.fromEntries(diff);
}
export default Globals;
