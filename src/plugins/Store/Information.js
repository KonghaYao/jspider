import { from } from "rxjs";
import { delayWhen } from "rxjs/operators";

function setInfo(STORE, Information) {
    return STORE.insert([Information])
        .then((res) => {
            return res;
        })
        .catch((error) => {
            Information.$commit("error", error);
        });
}
const setInfo$ =
    ({ STORE }) =>
    ($source) => {
        return $source.pipe(
            delayWhen((Task) => {
                let Information = Task.$output();
                return from(setInfo(STORE, Information));
            })
        );
    };
import { zangodb as zango } from "./zangodb.js";
function getInfo(STORENAME) {
    let db = new zango.Db("mydb", [STORENAME]);
    STORE = db.collection(STORENAME);
    return STORE.find();
}

export { setInfo, getInfo, setInfo$ };
