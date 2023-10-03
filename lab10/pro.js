
const readFileAsArray = function(file, cb) {
    fs.readFile(file, function(err, data) {
      if (err) {
        return cb(err);
      }
      const lines = data.toString().trim().split('\n');
      cb(null, lines);
    });
  };


  
readFileAsArray('./numbers.txt', (err, lines) => {
    if (err) throw err;
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(n => n%2 === 1);
    console.log('Odd numbers count:', oddNumbers.length);
  });



const readFileAsArray = function(file, cb = () => {}) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, function(err, data) {
        if (err) {
          reject(err);
          return cb(err);
        }
        const lines = data.toString().trim().split('\n');
        resolve(lines);
        cb(null, lines);
      });
    });
  };