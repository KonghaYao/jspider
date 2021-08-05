/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
export async function consumeBody(data) {
    // 标记为已经使用
    if (data.disturbed) {
        throw new TypeError(`body used already for: ${data.url}`);
    }
    data.disturbed = true;

    // 报错
    if (data.error) {
        throw data.error;
    }

    if (data.body instanceof FormData) {
        return new Blob([Object.fromEntries(data.body.entries())]);
    }
    return data.body;
}
