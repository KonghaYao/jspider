import { pipe } from "rxjs";
import { Task } from "../Task.js";
export const createTask = (context) =>
    pipe(
        map((message) => {
            const task = new Task(message, context.uuid);
            return task;
        })
    );
