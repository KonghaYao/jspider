/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:49:44
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 16:52:31
 */

/*
 * error Plugin-Request 这是一个错误的文本示例
 * 这些是辅助提示，用于描述发生的事件
 */

export class Logger {
    constructor(scope, flag, title, content) {
        Object.assign(this, { scope, flag, title, content, reportTime: new Date() });
    }
}
