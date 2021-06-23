/*
关于 PLUGIN 的生命周期

1. init 函数 (可以没有): 在 spider 预处理的时候会对所有 PLUGIN 的 init 函数进行异步顺序调用保证插件在运行前载入。

2. main 函数 (主要函数): 相当于承接上一个 PLUGIN 的 main 函数导出的数据，并实现功能上的数据处理和返回

3. error 函数 (错误处理函数): 相当于在 main 函数 error 时调用的函数，可以取消这个流，也可以处理完 error 后继续执行

4. complete 函数: 没有发生任何的 error 的情况下完成 main 方法时调用的函数



*/

class PLUGIN {
    constructor({ main, init = null, error = null, complete = null, options = null }) {
        Object.assign(
            {},
            {
                main,
                init,
                error,
                complete,
                options,
            }
        );
    }
    #wrapper(Task) {
        const result = Task.$commit("start");
        try {
            const PluginDone = this.main(result, this.options);
            Task.$commit("success", PluginDone);
        } catch (e) {
            this.error && this.error();
        }
        this.complete(Task);

        return Task;
    }
}
export function Plugin(Process) {
    if (Process instanceof Function) {
        return new PLUGIN({
            main: Process,
        });
    } else if (Process instanceof Object) {
        return new Plugin(Process);
    } else {
        throw new Error("Plugin must be input a function or Object");
    }
}
