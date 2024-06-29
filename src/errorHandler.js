module.exports = function (req, res, code, msg) {
    res.writeHead(code);
    res.end(JSON.stringify(msg));
};
//# sourceMappingURL=errorHandler.js.map