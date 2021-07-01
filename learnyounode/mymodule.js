  
const fs = require('fs');
const path = require('path');

module.exports = function(dirname, ext, callback) {
  const extension = "." + ext;
  fs.readdir(dirname, function(err, files) {
    if (err) {
      callback(err, null);
    }
    else {
      result = [];
      files.forEach(file => {
        if (path.extname(file) === extension) {
          result.push(file);
        }
      });
      callback(null, result);
    }
  });
  
};