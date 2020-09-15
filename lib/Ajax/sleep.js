function sleep(res, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res);
        }, ms);
    });
}
export default sleep;
