import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { Task } from "../Task/Task.js";

export const createTask = (context) =>
    pipe(
        map((message) => {
            const task = new Task(message, context.uuid);

            return task;
        })
    );
