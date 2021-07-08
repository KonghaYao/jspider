export class DataChunk extends Map {
    constructor() {
        super();
    }
    setChunk(dataBackup) {
        this.set(dataBackup._uuid, dataBackup);
    }
    clearChunk() {
        return this.clear();
    }
}
