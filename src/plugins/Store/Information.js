import { from } from "rxjs";
import { delayWhen } from "rxjs/operators";

function setInfo(STORE, Information) {
    return STORE.insert([Information]).then((res) => {
        return res;
    });
}
const setInfo$ =
    ({ STORE }) =>
    ($source) => {
        return $source.pipe(
            delayWhen((Task) => {
                let Information = Task.$output();
                return from(
                    setInfo(STORE, Information).catch((error) => {
                        Task.$commit("error", error);
                        console.log(Task.$index + "存储失败");
                    })
                );
            })
        );
    };
import { DB } from "./zangodb.js";
function getInfo(STORENAME = "default") {
    console.warn("您访问的数据库表名为 " + STORENAME);
    let db = DB(STORENAME);
    return new Promise((resolve, reject) => {
        db.find().toArray((error, docs) => {
            if (error) reject(error);

            resolve(docs);
        });
    });
}

export { setInfo, getInfo, setInfo$ };
