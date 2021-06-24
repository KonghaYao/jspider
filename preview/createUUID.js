import { u5 } from "uuid";
export function createUUID(string) {
    return u5(string, u5.URL);
}
