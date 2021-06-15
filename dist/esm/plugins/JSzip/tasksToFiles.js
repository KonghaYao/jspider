import { toFile } from '../utils/toFile.js';

function tasksToFiles(task) {
    const { url, name } = task.data;
    const data = task.$commit("processing");
    return toFile(data, name || url.replace(/[^\/]*?\//g, ""));
}

export { tasksToFiles };
