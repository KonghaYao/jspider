import { map } from "rxjs/operators";
export default function (func, needReturn = true) {
    return ($source) => {
        return $source.pipe(
            map((task) => {
                try {
                    const result = func(task.data);
                    if (needReturn) {
                        task.$commit("stateChange", result);
                    }
                    return task;
                } catch (error) {
                    task.$commit("error", error);
                    return task;
                }
            })
        );
    };
}
