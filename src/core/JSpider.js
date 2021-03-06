/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:06:52
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 15:56:22
 */
import { createTask, skipSame } from './coreOperators/index.js';
import { createUUID } from './createUUID.js';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

export class JSpider {
    _ready = false;
    uuid = '';

    #PluginLine = [];
    constructor(...Plugins) {
        this.#createLineUUID(Plugins);
        this.Plugins = Plugins;
    }
    #createLineUUID(Plugins) {
        this.uuid = createUUID(Plugins.reduce((string, plugin) => string + plugin.uuid, ''));
    }

    #preparePlugins() {
        return this.Plugins.reduce((promise, plugin) => {
            this.#PluginLine.push(plugin.operator(this));
            if (plugin.init instanceof Function) {
                promise.then(() => plugin.init());
            }
            return promise;
        }, Promise.resolve()).then(() => (this._ready = true));
    }

    // 用于使用一个不是工作流的插件
    use(plugin) {}

    // 开始工作流
    async apply(inputs) {
        if (!this._ready) {
            await this.#preparePlugins();
        }
        from(inputs)
            .pipe(
                createTask(this),
                skipSame(this),
                ...this.#PluginLine,
                tap((task) => {
                    // from(task).pipe(tap(console.log)).subscribe();
                    task.$commit('complete', this.uuid);
                }),
            )
            .subscribe({
                complete() {},
            });
    }
}
