/*
 * @Author: KonghaYao
 * @Date: 2021-06-28 21:07:38
 * @Last Modified by:   KonghaYao
 * @Last Modified time: 2021-06-28 21:07:38
 */
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { Task } from "../Task/Task.js";

export const createTask = (context) =>
    pipe(
        map((message) => {
            const task = new Task(message, context.uuid);

            return task;
        }),
    );
