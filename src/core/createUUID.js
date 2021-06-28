/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:01
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:07:01
 */
import { v5 } from "uuid";

export function createUUID(string) {
    return v5(string, v5.URL);
}
