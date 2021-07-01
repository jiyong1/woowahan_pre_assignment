const http = require('http');
let count = 0;
const result = [];

function printResults() {
    result.forEach(str => {
        console.log(str);
    })
}

function httpGet(idx) {
    http.get(process.argv[2+idx], res => {
        let str = ''
        res.on('data', data => {
            str += data;
        })
        res.on('end', () => {
            count ++;
            result[idx] = str;
            if(count === 3) {
                printResults();
            }
        })
    })
}
for (let i=0; i<3; i++) {
    httpGet(i);
}