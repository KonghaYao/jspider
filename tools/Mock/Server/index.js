/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import excelTemplate from './excel.js';
// 在这里配置 url 和 type 信息
const Server = {
    excel: {
        url: '/fake/excel',
        type: 'get',
        template: excelTemplate,
    },
};

export { Server };
