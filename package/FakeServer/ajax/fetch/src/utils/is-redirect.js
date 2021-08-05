/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
const redirectStatus = new Set([301, 302, 303, 307, 308]);

export const isRedirect = (code) => {
    return redirectStatus.has(code);
};
