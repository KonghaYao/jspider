function type(any) {
    return Object.prototype.toString.call(any).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
}
export { type };
export default type;
