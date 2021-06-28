import { v5 } from "uuid";

export function createUUID(string) {
    return v5(string, v5.URL);
}
