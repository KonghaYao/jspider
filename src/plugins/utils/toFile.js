/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */

export function toFile(data, name) {
    if (data instanceof File) return data;
    if (data instanceof Blob) {
        data.name = name;
        return data;
    }

    return new File([JSON.stringify(data)], name);
}
