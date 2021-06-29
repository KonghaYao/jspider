/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:49:44
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 18:57:30
 */

/*
 * 输入字符串的格式: $type:scope;title|description
 */
const LoggerRE = /^\$([^:]+?):([^;]+?);([^\|]+)\|?([\s\S]*)/;
export class Logger {
    constructor(str) {
        this.convert(str);
    }
    convert(str) {
        const items = LoggerRE.exec(str);
        let type = "log";
        let scope = "global";
        let title = str;
        let description = "";
        if (items) {
            [, type, scope, title, description] = items;
        }
        Object.assign(this, { scope, type, title, description, reportTime: new Date() });
    }
}
