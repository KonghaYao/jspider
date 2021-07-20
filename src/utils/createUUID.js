/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { v5 } from 'uuid';

export function createUUID(string) {
    return v5(string, v5.URL);
}
