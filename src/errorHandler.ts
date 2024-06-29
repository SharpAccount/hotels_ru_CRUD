module.exports = (req: any, res: any, code: number, msg: object): void => {
    res.writeHead(code);
    res.end(JSON.stringify(msg));
}