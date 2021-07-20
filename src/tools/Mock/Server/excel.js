/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
export default {
    'data|100': [
        {
            ID: '@increment()',
            name: '@cname()',
            description: '@csentence()',
            avatar: '@dataImage("64x64")',
            address: '@region()',
            province: '@province()',
        },
    ],
};
