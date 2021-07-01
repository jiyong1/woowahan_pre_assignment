const net = require('net');
function zeroFill(data) {
    return data < 10? '0' + String(data):String(data); 
}
const server = net.createServer(socket => {
    const date = new Date();
    const year = date.getFullYear();
    const month = zeroFill(date.getMonth()+1)
    const day = zeroFill(date.getDate());
    const hour = zeroFill(date.getHours());
    const minute = zeroFill(date.getMinutes());
    const data = `${year}-${month}-${day} ${hour}:${minute}` + '\n';
    socket.end(data);
})
server.listen(process.argv[2]);