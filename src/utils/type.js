/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */

function type(any) {
    return Object.prototype.toString.call(any).match(/(?<=\[object\s+)\S+?(?=\])/)[0];
}
export { type };
export default type;
