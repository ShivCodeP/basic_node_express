import UserAgent from "user-agents";
import fs from "fs";

const logger = (req, res, next) => {
    const userAgent = new UserAgent();
    // console.log(req.route,userAgent.toString());
    const data = req.route.toString() + userAgent.toString();
    fs.appendFile("../logs.txt", data, (err) => {
        if (err) { throw err };
    })
    next();
}

export default logger;