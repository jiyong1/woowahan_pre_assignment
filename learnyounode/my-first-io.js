const fs = require('fs');
const path = process.argv[2];
const buff = fs.readFileSync(path);
console.log(buff.toString().split("\n").length - 1);