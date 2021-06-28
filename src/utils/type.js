/**
 * type
 * @date 2021-06-28
 * @param {any} any
 * @return {any}
 */
function type(any) {
    return Object.prototype.toString
        .call(any)
        .match(/(?<=\[object\s+)\S+?(?=\])/)[0];
}
export { type };
export default type;
