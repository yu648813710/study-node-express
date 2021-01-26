const myBodyParser = (req, res, next) => {
    let str = '';
    req.on("data", (data) => {
        str += data;
    });
    req.on("end", () => {
        req.body = str;
        next();
    });
}

module.exports = myBodyParser;