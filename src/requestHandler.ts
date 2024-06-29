import * as url from "url";

const sensorsRoutes = require("../src/routes/sensorRoutes")
const errorHandler = require("./errorHandler")

const requestHandler = (req: any, res: any): void => {
    const parsedUrl= url.parse(req.url,true);
    const path: string = parsedUrl.pathname;
    res.setHeader("Content-Type", "application/json");

    if (path.startsWith("/sensors")) {
        sensorsRoutes(req, res);
    } else {
        errorHandler(req, res, 404, {message: "Error 404: didn`t find route!"})
    }
}

module.exports = requestHandler;