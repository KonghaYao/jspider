export class TaskError {
    constructor(message) {
        this.err = message;
        this.errTime = new Date();
    }
}
