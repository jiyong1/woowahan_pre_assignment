'use strict';
const http = require('http');
const url = require('url');

const urls = {
    "/api/parsetime": function(parsedUrl) {
        const date = new Date(parsedUrl.query.iso);
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    },
    "/api/unixtime": function(parsedUrl) {
        return {
            unixtime: (new Date(parsedUrl.query.iso)).getTime()
        };
    }
}

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const resource = urls[parsedUrl.pathname];
    if (resource) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resource(parsedUrl)));
    } else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(process.argv[2]);