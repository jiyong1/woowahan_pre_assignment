const mymoduleFunc = require('./mymodule.js');
const dirname = process.argv[2];
const ext = process.argv[3];

mymoduleFunc(dirname, ext, function(err, files) {
    if (err) {
        return console.error(err);
    }
    for (i = 0; i < files.length; i++) {
        console.log(files[i]);
    }
});