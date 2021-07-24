// 不可以在原生的 XMLHttpRequest 上直接定义 getter 和 setter，
// 也不可以在 XHR 实例上定义
// 这样的话会导致无法接收到数据
// 但是确认为是 mockjs 内的数据返回就可以直接修改 XHR 实例了

export function defineGetAndSet(XHR) {
    // 将这些 键值对 映射到 $data 属性对象的对应值上去
    const array = ['readyState', 'status', 'response', 'responseText', 'statusText'];
    Object.defineProperties(
        XHR,
        array.reduce((col, cur) => {
            col[cur] = {
                get() {
                    return this.$data[cur];
                },
                set(state) {
                    this.$data[cur] = state;
                },
            };
            return col;
        }, {}),
    );
}
