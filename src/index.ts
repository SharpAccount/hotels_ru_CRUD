const http = require("http");

const hostname: string = "localhost";
const port: number = 8080;
const requestHandler = require("./requestHandler");

const server = http.createServer(requestHandler);

server.listen(port, hostname, (): void => {
    console.log(`now server is running on ${port} port`)
});