'use strict';
const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], (err, files) => {
    if (err) {
        console.log(err);
    }
    const ext = '.' + process.argv[3];
    files.forEach(file => {
        if (path.extname(file) === ext) {
            console.log(file);
        }
    })
})