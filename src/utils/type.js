export default function type(any) {
    return Object.prototype.toString.call(any).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
}
