/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:10
 * @Last Modified by: KonghaYao
 * @Last Modified time: 2021-06-29 16:16:59
 */
import Components from './TaskComponents.js';
import type from '../../utils/type.js';
import { v4 as uuidv4 } from 'uuid';
import { pick } from 'lodash-es';
const { format, commit } = Components;
import { TaskError } from '../Errors/errors.js';
// Task 的结构借鉴于 Vue 的组件写法

export class Task {
    _index = uuidv4();
    _status = 'free';
    _createdAt = new Date();
    _updatedAt = new Date();
    _errorList = [];
    originData = {}; // 源数据，是由用户传入经过 format 的数据
    _result; // 每个中间件传出的数据
    _marks = {}; // 记录完成流程的过程标志 { UUID: pluginsResult }
    _complete = false;
    _processUUID = ''; // JSpider 的实例的 UUID

    constructor(message, UUID) {
        Object.assign(this.originData, Components.data());
        this.$formatMessage(message);
        this._processUUID = UUID;
    }
    $formatMessage(message) {
        const MessageType = type(message);
        if (format[MessageType] instanceof Function) {
            format[MessageType].apply(this, [message]);
        } else {
            throw new TaskError('format 状态错误' + this._index);
        }
    }
    // 通过 commit 更改 Task 内部的status
    $commit(status, ...payload) {
        if (commit[status] instanceof Function) {
            const returnData = commit[status].apply(this, payload);
            if (returnData !== false) {
                this._status = status;
                this._updatedAt = new Date();
                return returnData;
            }
        } else {
            throw new TaskError('commit 状态错误' + this._index);
        }
    }
    $checkRepeat(markUUID) {
        return this._marks?.[markUUID];
    }
    // 数据导出和导入的接口
    $output() {
        const output = pick([
            '_processUUID',
            '_index',
            '_status',
            '_createdAt',
            '_updatedAt',
            '_errorList',
            '_result',
            '_marks',
            'originData',
        ]);
        output._isABackup = true;
        return output;
    }
}
