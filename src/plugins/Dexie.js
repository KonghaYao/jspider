/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { from } from 'rxjs';
import { delayWhen } from 'rxjs/operators';
import { init } from './Dexie/Dexie.js';
import { putData, getData } from './Dexie/data.js';

// FIXME 未进行 Plugin 化
const setStore = (options) => ($source) => {
    // 初始化配置
    const { dbName = 'JSpider' } = options || {};
    return $source.pipe(
        delayWhen((task) => {
            task.$commit('complete', task._mainUUID);
            const Information = task.$output();
            Information._isABackup = true;

            return from(putData(dbName, Information));
        }),
    );
};

export { getData, setStore, init };
