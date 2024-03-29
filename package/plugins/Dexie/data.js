/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { Dexie } from './Dexie.js';

const dbCache = {};
function openDB(dbName) {
    let db = new Dexie(dbName);
    return db
        .open()
        .catch('NoSuchDatabaseError', () => {
            db.close();
            db = new Dexie(dbName);
            db.version(1).stores({
                default: '_index,createdAt',
            });
            return db.open();
        })
        .then((db) => (dbCache[dbName] = db));
}
// 获得表数据
async function getData(dbName = 'JSpider') {
    if (!dbCache.hasOwnProperty(dbName)) await openDB(dbName);
    return new Promise((resolve, reject) => {
        try {
            console.log('从 index DB 中取出数据');
            return dbCache[dbName].table('default').toArray(resolve);
        } catch (err) {
            reject(err);
        }
    });
}
async function putData(dbName, value) {
    if (!dbCache.hasOwnProperty(dbName)) await openDB(dbName);
    const data = dbCache[dbName].table('default').put(value, '_index');
    console.log('置入数据成功');
    return data;
}
export { getData, putData };
