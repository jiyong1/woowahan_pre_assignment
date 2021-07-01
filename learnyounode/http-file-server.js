const http = require('http');
const fs = require('fs');
const fileName = process.argv[3];

const server = http.createServer((req, res) => {
    fs.createReadStream(fileName).pipe(res)
});
server.listen(process.argv[2]);