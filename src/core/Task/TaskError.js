/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:19
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:07:19
 */
export class TaskError {
    constructor(message) {
        this.err = message;
        this.errTime = new Date();
    }
}
