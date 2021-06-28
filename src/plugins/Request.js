/* eslint-disable no-invalid-this */

import { Plugin } from "../core/PluginSystem.js";
import { concurrent } from "../utils/concurrent.js";

// ! 这个 Request 文件是标准的 Plugin 的高级注册示例

// Format 是边缘的处理逻辑，用于自动化相应返回数据的格式处理，与 Plugin 关系较小
const Format = function (res, returnType) {
    const type = res.headers.get("content-type") || "";
    // 根据 returnType 强制返回
    if (!returnType || returnType === "auto") {
        // 自动判断类型并解析
        if (/text|html|rtf|xml/.test(type)) {
            return res.text();
        } else if (/json/.test(type)) {
            return res.json();
        } else if (/arrayBuffer/.test(type)) {
            return res.arrayBuffer();
        } else {
            // 默认返回 Blob 数据 配合 node端 的buffer
            return res.buffer ? res.buffer() : res.blob();
        }
    } else if (returnType) {
        return res[returnType]();
    } else {
        return res.json();
    }
};

// Plugin 的核心函数 (this.main)，用于请求
// 第一参数为 Task 内部使用 start 事件返回的参数，你可以看成是上一个 Plugin 返回给你的数据
// 第二个为 Plugin 内部的 options, 可以调用这些数据进行操作

const request = function ({ url, options = {} }) {
    const { returnType = "json" } = this.options;

    //  获取数据为 request
    console.log("- 爬取 ", url);
    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return Format(res, returnType);
        })
        .then((res) => {
            console.log(url + " 爬取成功");
            return res;
        })
        .catch((err) => {
            throw err;
        });
};

// 在超过重试次数时，进行的操作
const HandleError = function (err) {
    throw err;
};
export const Request = function (options = {}) {
    return Plugin({
        init() {}, // 在所有工作开始前会启动的函数，可以用于 Promise 加载一些 js 插件
        main: request, // 功能性的核心函数
        options, // 接收所有的参数，提供给所有函数使用

        operator() {
            // 复写 operator 函数，属于高级操作，可以操作到最顶层的数据流环节

            // 通过 this.options 来获取传入的参数，这个参数解析都是由 Plugin 开发者来设置逻辑的
            // 所以灵活性很高
            const {
                delay = 200,
                buffer = 3,
                retry = 3,
                handleError = null
            } = this.options;

            return ($source) =>
                $source.pipe(
                    concurrent(
                        (task) =>
                            // 注意此处的 TaskStarter 是 Plugin 内置的函数，通过这个函数可以直接回应 Task
                            // 使得 Plugin 开发者 不用学 Task 相关知识，而只是调用一下这个形式就可以了
                            // this.TaskStarter 是用于间接调用 this.main 函数的 Wrapper 函数，主要是对 Task 进行一些操作
                            this.TaskStarter(task),
                        {
                            delay,
                            buffer,
                            retry,
                            handleError: handleError || HandleError
                        }
                    )
                );
        }
    });
};
