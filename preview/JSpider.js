import { createTask, skipSame } from "./coreOperators/index.js";
import { createUUID } from "./createUUID.js";
import { concurrent } from "../src/utils/concurrent.js";
import { from } from "rxjs";
import { tap } from "rxjs/operators";

export class JSpider {
    _ready = false;
    uuid = "";

    #PluginLine = [];
    constructor(...Plugins) {
        this.#createLineUUID(Plugins);
        this.#preparePlugins(Plugins);
    }
    #createLineUUID(Plugins) {
        this.uuid = createUUID(Plugins.reduce((string, plugin) => string + plugin.uuid, ""));
    }
    #preparePlugins(Plugins) {
        from(Plugins)
            .pipe(
                tap((plugin) => {
                    // 先直接应用 operator 就可以在 pipe line 上不用函数应用了
                    this.#PluginLine.push(plugin.operator(this));
                }),
                concurrent((plugin) => plugin.init(), {
                    delay: 0,
                })
            )
            .subscribe({
                complete: () => {
                    this._ready = true;
                },
            });
    }

    use(plugin) {}
    apply(inputs) {
        from(inputs)
            .pipe(
                createTask(this),
                skipSame(this),
                ...this.#PluginLine,
                tap((task) => task.$commit("complete", this.uuid))
            )
            .subscribe({
                complete() {},
            });
    }
}
