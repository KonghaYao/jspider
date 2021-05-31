import { map, tap } from "rxjs/operators";
export default function (func, needReturn = true) {
    return ($source) => {
        let Func = needReturn ? map : tap;
        return $source.pipe(
            Func((task) => {
                return task;
            })
        );
    };
}
