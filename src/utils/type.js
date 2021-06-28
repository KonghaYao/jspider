/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:06:20
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:06:20
 */

function type(any) {
    return Object.prototype.toString.call(any).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
}
export { type };
export default type;
