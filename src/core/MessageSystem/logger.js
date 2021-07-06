/*
 * @Author: KonghaYao
 * @Date: 2021-06-29 16:49:44
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-07-06 14:54:59
 */
import { CounterCenter } from './counterCenter';
/*
 *  $type:scope;title|description
 */
export class Logger {
    constructor(type, scope, title, description) {
        Object.assign(this, { scope, type, title, description, reportTime: new Date() });
        CounterCenter.reportLogger(this); // 直接派送到 CounterCenter
    }

    // 根据内容渲染数据并打印在控制台
    print() {}
}
