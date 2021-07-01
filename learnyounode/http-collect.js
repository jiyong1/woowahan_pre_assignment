const http = require('http');
http.get(process.argv[2], (res) => {
    const result = []
    res.setEncoding('utf8');
    res.on('data', (data) => {
        result.push(data);
    });
    res.on('end', () => {
        const resultStr = result.join('');
        console.log(resultStr.length);
        console.log(resultStr);
    })
    res.on('error', console.error);
}).on('error', console.error);
